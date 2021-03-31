import {
  APPLICATION_STATE,
  LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT,
  LRSG_SECTOR_AMOUNT,
  LRSG_OPEN_AMOUNT,
  LRSG_OPEN_VERSION_2_AMOUNT,
  CSP_AMOUNT,
  CBLG_AMOUNT,
  LRSG_CLOSED_TIER_2_AMOUNT,
  LRSG_CLOSED_TIER_3_AMOUNT,
  LRSG_CLOSED_TIER_4_AMOUNT,
  LRSG_CLOSED_5_JAN_AMOUNT,
  LRSG_CLOSED_5_JAN_CYCLE_2_AMOUNT,
} from 'lib/dbMapping';
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

export const updateApplication = ({ getDbInstance }) => async ({
  clientGeneratedId,
  data,
  user,
}) => {
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
    'lrsgOpenVersion2Amount',
    'cspAmount',
    'cblgAmount',
    'lrsgClosedTier2Amount',
    'lrsgClosedTier3Amount',
    'lrsgClosedTier4Amount',
    'lrsgClosed5JanAmount',
    'lrsgClosed5JanCycle2Amount',
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

  const dbInstance = await getDbInstance();

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
    return processLrsgClosedBusinessAmount(
      addHistoryEntry,
      updateLrsgClosedBusinessAmount,
      data.lrsgClosedBusinessesAmount
    );
  } else if (data.lrsgOpenAmount) {
    return processLrsgOpenAmount(
      addHistoryEntry,
      updateLrsgOpenAmount,
      data.lrsgOpenAmount
    );
  } else if (data.lrsgOpenVersion2Amount) {
    return processLrsgOpenVersion2Amount(
      addHistoryEntry,
      updateLrsgOpenVersion2Amount,
      data.lrsgOpenVersion2Amount
    );
  } else if (data.lrsgSectorAmount) {
    return processLrsgSectorAmount(
      addHistoryEntry,
      updateLrsgSectorAmount,
      data.lrsgSectorAmount
    );
  } else if (data.cspAmount) {
    return processCspAmount(addHistoryEntry, updateCspAmount, data.cspAmount);
  } else if (data.cblgAmount) {
    return processCblgAmount(
      addHistoryEntry,
      updateCblgAmount,
      data.cblgAmount
    );
  } else if (data.lrsgClosedTier2Amount) {
    return processLrsgClosedTiersAmount(
      addHistoryEntry,
      updateLrsgClosedTiersAmount,
      data.lrsgClosedTier2Amount,
      '2'
    );
  } else if (data.lrsgClosedTier3Amount) {
    return processLrsgClosedTiersAmount(
      addHistoryEntry,
      updateLrsgClosedTiersAmount,
      data.lrsgClosedTier3Amount,
      '3'
    );
  } else if (data.lrsgClosedTier4Amount) {
    return processLrsgClosedTiersAmount(
      addHistoryEntry,
      updateLrsgClosedTiersAmount,
      data.lrsgClosedTier4Amount,
      '4'
    );
  } else if (data.lrsgClosed5JanAmount) {
    return processLrsgClosed5JanAmount(
      addHistoryEntry,
      updateLrsgClosed5JanAmount,
      data.lrsgClosed5JanAmount
    );
  } else if (data.lrsgClosed5JanCycle2Amount) {
    return processLrsgClosed5JanCycle2Amount(
      addHistoryEntry,
      updateLrsgClosed5JanCycle2Amount,
      data.lrsgClosed5JanCycle2Amount
    );
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

  async function processCspAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!CSP_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await update(dbInstance, grantAmountAwarded, clientGeneratedId);

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `CSP awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateCspAmount(db, grantAmountAwarded, clientGeneratedId) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET csp_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processCblgAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!CBLG_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await update(dbInstance, grantAmountAwarded, clientGeneratedId);

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `CBLG awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateCblgAmount(db, grantAmountAwarded, clientGeneratedId) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET cblg_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgClosedTiersAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded,
    tier
  ) {
    if (
      tier === '2' &&
      !LRSG_CLOSED_TIER_2_AMOUNT.includes(grantAmountAwarded)
    ) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    if (
      tier === '3' &&
      !LRSG_CLOSED_TIER_3_AMOUNT.includes(grantAmountAwarded)
    ) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    if (
      tier === '4' &&
      !LRSG_CLOSED_TIER_4_AMOUNT.includes(grantAmountAwarded)
    ) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await update(dbInstance, grantAmountAwarded, clientGeneratedId, tier);

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG Closed (Tier ${tier}) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgClosedTiersAmount(
    db,
    grantAmountAwarded,
    clientGeneratedId,
    tier
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_closed_tier_${tier}_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgClosed5JanAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!LRSG_CLOSED_5_JAN_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await updateLrsgClosed5JanAmount(
      dbInstance,
      grantAmountAwarded,
      clientGeneratedId
    );

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG Closed (5 Jan) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgClosed5JanAmount(
    db,
    grantAmountAwarded,
    clientGeneratedId
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_closed_5_jan_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgClosed5JanCycle2Amount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!LRSG_CLOSED_5_JAN_CYCLE_2_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await updateLrsgClosed5JanCycle2Amount(
      dbInstance,
      grantAmountAwarded,
      clientGeneratedId
    );

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG Closed (5 Jan) Payment Cycle 2 awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgClosed5JanCycle2Amount(
    db,
    grantAmountAwarded,
    clientGeneratedId
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_closed_5_jan_cycle_2_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgClosedBusinessAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await updateLrsgClosedBusinessAmount(
      dbInstance,
      grantAmountAwarded,
      clientGeneratedId
    );

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (closed businesses) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgClosedBusinessAmount(
    db,
    grantAmountAwarded,
    clientGeneratedId
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_closed_businesses_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgOpenAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!LRSG_OPEN_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await update(dbInstance, grantAmountAwarded, clientGeneratedId);

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (open) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgOpenAmount(
    db,
    grantAmountAwarded,
    clientGeneratedId
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_open_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgOpenVersion2Amount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!LRSG_OPEN_VERSION_2_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await update(dbInstance, grantAmountAwarded, clientGeneratedId);

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (Open) Version 2 awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgOpenVersion2Amount(
    db,
    grantAmountAwarded,
    clientGeneratedId
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_open_version_2_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
  }

  async function processLrsgSectorAmount(
    recordHistoryEntry,
    update,
    grantAmountAwarded
  ) {
    if (!LRSG_SECTOR_AMOUNT.includes(grantAmountAwarded)) {
      return createResponse(INVALID_GRANT_AMOUNT);
    }

    await update(dbInstance, grantAmountAwarded, clientGeneratedId);

    await recordHistoryEntry(
      dbInstance,
      grantApplicationId,
      user,
      `LRSG (sector) awarded amount updated to £${grantAmountAwarded}`
    );

    return createResponse(null);
  }

  async function updateLrsgSectorAmount(
    db,
    grantAmountAwarded,
    clientGeneratedId
  ) {
    const updateGrantAmountQuery = `
      UPDATE application_assessment
      SET lrsg_sector_amount = $(grantAmountAwarded)
      FROM grant_application
      WHERE application_assessment.grant_application_id = grant_application.id
      AND grant_application.client_generated_id = $(clientGeneratedId);`;
    await db.none(updateGrantAmountQuery, {
      grantAmountAwarded,
      clientGeneratedId,
    });
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
