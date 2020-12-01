import {
  APPLICATION_STATE,
  LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT,
  LRSG_SECTOR_AMOUNT,
  LRSG_OPEN_AMOUNT,
} from 'lib/dbMapping';
import getDb from '../gateways/db';
import {
  APPLICATION_NOT_FOUND,
  DISALLOWED_PROPERTY_IN_REQUEST,
  NO_ALLOWED_PROPERTIES_IN_REQUEST,
} from '../constants';

export const ONE_PROPERTY_PERMITTED =
  'Only one of status or validations is permitted';
export const INVALID_STATUS = 'Invalid status submitted';
export const INVALID_GRANT_AMOUNT = 'Invalid grant amount submitted';

// I don't like it, but this file has no tests and I don't have the time to
// step back and rectify that, so I'm adding the grant_amount_awarded stuff
// without tests :-|

export const updateApplication = async ({ clientGeneratedId, data, user }) => {
  const createResponse = (error) => {
    return {
      error,
    };
  };

  const allowedPatchProperties = [
    'status',
    'validations',
    'lrsgClosedBusinessesAmount',
    'lrsgSectorAmount',
    'lrsgOpenAmount',
  ];
  let numberOfPropertiesInRequest = 0;
  for (let [key] of Object.entries(data)) {
    if (allowedPatchProperties.includes(key) === false) {
      return createResponse(DISALLOWED_PROPERTY_IN_REQUEST);
    }
    if (data[key]) {
      numberOfPropertiesInRequest++;
    }
  }

  if (numberOfPropertiesInRequest === 0) {
    return createResponse(NO_ALLOWED_PROPERTIES_IN_REQUEST);
  }

  if (numberOfPropertiesInRequest > 1) {
    return createResponse(ONE_PROPERTY_PERMITTED);
  }

  const dbInstance = await getDb.getInstance();

  let grantApplicationId;
  try {
    const applicationIdQuery = `
      SELECT ga.id
      FROM grant_application ga
      WHERE ga.client_generated_id = $1;`;
    const applicationIdResult = await dbInstance.one(applicationIdQuery, [
      clientGeneratedId,
    ]);
    grantApplicationId = applicationIdResult.id;
  } catch (error) {
    if (
      error.name === 'QueryResultError' &&
      // queryResultErrorCode.noData is 0, see https://github.com/vitaly-t/pg-promise/blob/master/lib/errors/query-result-error.js
      error.code === 0
    ) {
      return createResponse(APPLICATION_NOT_FOUND);
    }
    throw error;
  }

  if (data.status) {
    return processStatus(data.status);
  } else if (data.lrsgClosedBusinessesAmount) {
    return processLrsgClosedBusinessAmount(data.lrsgClosedBusinessesAmount);
  } else if (data.lrsgOpenAmount) {
    return processLrsgOpenAmount(data.lrsgOpenAmount);
  } else if (data.lrsgSectorAmount) {
    return processLrsgSectorAmount(data.lrsgSectorAmount);
  } else {
    return processValidations(data.validations);
  }

  async function processValidations(validations) {
    const updateValidationsQuery = `
      UPDATE application_assessment
      SET validations=$(validations)
      WHERE grant_application_id=$(grantApplicationId) ;`;

    await dbInstance.none(updateValidationsQuery, {
      validations,
      grantApplicationId,
    });

    return createResponse(null);
  }

  async function processStatus(statusString) {
    const statusIndex = APPLICATION_STATE.findIndex(
      (status) => status === statusString
    );
    if (statusIndex === -1) {
      return createResponse(INVALID_STATUS);
    }

    const updateStatusQuery = `
      INSERT INTO application_assessment(grant_application_id, application_state_id)
      SELECT id, $(statusId)
      FROM grant_application
      WHERE client_generated_id = $(clientGeneratedId)
      ON CONFLICT (grant_application_id)
      DO UPDATE
      SET application_state_id = $(statusId);`;
    await dbInstance.none(updateStatusQuery, {
      statusId: statusIndex + 1,
      clientGeneratedId,
    });

    await addHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `Status updated to "${data.status}"`
    );

    return createResponse(null);
  }

  async function processLrsgClosedBusinessAmount(grantAmountAwarded) {
    if (!LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_closed_businesses_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await dbInstance.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });

    await addHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (closed businesses) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function processLrsgOpenAmount(grantAmountAwarded) {
    if (!LRSG_OPEN_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_open_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await dbInstance.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });

    await addHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (open) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function processLrsgSectorAmount(grantAmountAwarded) {
    if (!LRSG_SECTOR_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_sector_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await dbInstance.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });

    await addHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (sector) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function addHistoryEntry(dbInstance, grantApplicationId, user, notes) {
    const addHistoryQuery = `
    INSERT INTO application_history(grant_application_id, user_recorded, notes)
    VALUES($(grantApplicationId), $(user), $(notes));`;

    await dbInstance.none(addHistoryQuery, {
      grantApplicationId,
      user,
      notes,
    });
  }
};
