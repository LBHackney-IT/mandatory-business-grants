import { APPLICATION_STATE } from 'lib/dbMapping';

export const PAGE_MUST_BE_AT_LEAST_ONE =
  'Cannot list applications. Page must be at least 1.';
export const PAGINATED_PAST_END =
  'Cannot list applications. It appears that you have paginated beyond the end.';

const listApplications = ({ getDbInstance, getListGrantOfficers }) => async ({
  currentPage,
  pageSize,
  sort,
  status,
  businessCategory,
  businessSubcategory,
  grantOfficer,
  clientGeneratedId,
}) => {
  currentPage = currentPage !== undefined ? currentPage : 1;
  pageSize = pageSize || 10;
  sort = sort || '+applicationDate';

  if (currentPage < 1) {
    return createErrorResponse(PAGE_MUST_BE_AT_LEAST_ONE);
  }

  const offset = (currentPage - 1) * pageSize;
  let sortBy = 'ga.date_time_recorded';
  switch (sort.slice(1)) {
    case 'businessName':
      sortBy = 'LOWER(b.business_name)';
      break;
  }
  const sortDirection = sort.slice(0, 1) === '-' ? 'DESC' : 'ASC';
  const statesFilter = calculateStatesFilter(status);
  const listGrantOfficers = getListGrantOfficers();
  const grantOfficerFilter = await calculateGrantOfficersFilter(
    listGrantOfficers,
    grantOfficer
  );
  const clientGeneratedIdFilter = clientGeneratedId || '%';

  const db = await getDbInstance();
  const query = `
    SELECT
      ga.date_time_recorded,
      ga.client_generated_id,
      b.business_name,
      state.description AS status,
      aa.lrsg_closed_businesses_payment_exported AS closed_grant_exported,
      aa.lrsg_open_payment_exported AS open_grant_exported,
      aa.lrsg_open_version_2_payment_exported AS open_version_2_grant_exported,
      aa.lrsg_sector_payment_exported AS sector_grant_exported,
      aa.csp_payment_exported AS csp_grant_exported,
      aa.cblg_payment_exported AS cblg_grant_exported,
      aa.lrsg_closed_tier_2_payment_exported AS closed_tier_2_grant_exported,
      aa.lrsg_closed_tier_3_payment_exported AS closed_tier_3_grant_exported,
      aa.lrsg_closed_tier_4_payment_exported AS closed_tier_4_grant_exported,
      aa.lrsg_closed_5_jan_payment_exported AS closed_5_jan_grant_exported,
      aa.lrsg_closed_5_jan_cycle_2_payment_exported AS closed_5_jan_cycle_2_grant_exported,
      COUNT(*) OVER() AS total_applications
    FROM
      grant_application AS ga
    JOIN business AS b ON
      b.grant_application_id = ga.id
    JOIN eligibility_criteria AS ec
      ON ec.grant_application_id = ga.id
    JOIN eligibility_criteria_details AS ecd
      ON ecd.grant_application_id = ga.id
    JOIN application_assessment AS aa ON
      ga.id = aa.grant_application_id
    JOIN (
      SELECT DISTINCT grant_application_id
        FROM application_history
        WHERE user_recorded IN ($(grantOfficerFilter:list))
      ) AS ah
      ON ga.id = ah.grant_application_id
    JOIN application_state AS state ON
      aa.application_state_id = state.id
    WHERE aa.application_state_id IN ($(statesFilter:list))
      AND ga.client_generated_id LIKE $(clientGeneratedIdFilter)
      AND ecd.business_category = COALESCE($(businessCategory), ecd.business_category)
      AND ecd.business_sub_category = COALESCE($(businessSubcategory), ecd.business_sub_category)
    ORDER BY ${sortBy} ${sortDirection}
    LIMIT $(pageSize) OFFSET $(offset);`;

  const applications = await db.any(query, {
    pageSize,
    offset,
    statesFilter,
    businessCategory,
    businessSubcategory,
    grantOfficerFilter,
    clientGeneratedIdFilter,
  });

  const totalPages = calculateTotalPages();

  if (totalPages === 0 && currentPage > 1) {
    return createErrorResponse(PAGINATED_PAST_END);
  }

  return {
    applications: applications.map((application) => {
      const exported_grants_array = [];

      if (application.closed_grant_exported) {
        exported_grants_array.push('LRSG Closed');
      }
      if (application.open_grant_exported) {
        exported_grants_array.push('LRSG Open');
      }
      if (application.open_version_2_grant_exported) {
        exported_grants_array.push('LRSG Open Version 2');
      }
      if (application.sector_grant_exported) {
        exported_grants_array.push('LRSG Sector');
      }
      if (application.csp_grant_exported) {
        exported_grants_array.push('CSP');
      }
      if (application.cblg_grant_exported) {
        exported_grants_array.push('CBLG');
      }
      if (application.closed_tier_2_grant_exported) {
        exported_grants_array.push('LRSG Closed (Tier 2)');
      }
      if (application.closed_tier_3_grant_exported) {
        exported_grants_array.push('LRSG Closed (Tier 3)');
      }
      if (application.closed_tier_4_grant_exported) {
        exported_grants_array.push('LRSG Closed (Tier 4)');
      }
      if (application.closed_5_jan_grant_exported) {
        exported_grants_array.push('LRSG Closed (5 Jan)');
      }
      if (application.closed_5_jan_cycle_2_grant_exported) {
        exported_grants_array.push('LRSG Closed (5 Jan) Payment Cycle 2');
      }

      const exported_grants = exported_grants_array.join(', ');

      return {
        clientGeneratedId: application.client_generated_id,
        businessName: application.business_name,
        applicationDate: new Date(application.date_time_recorded).toISOString(),
        status: application.status,
        exported: exported_grants,
      };
    }),
    pagination: {
      totalPages,
      currentPage,
      links: {
        firstPage: createPageURL(1),
        lastPage: createPageURL(totalPages),
        previousPage: createPageURL(currentPage - 1),
        nextPage: createPageURL(currentPage + 1),
      },
    },
    error: null,
  };

  function calculateTotalPages() {
    let totalPages = 0;
    if (applications.length > 0) {
      totalPages = Math.ceil(applications[0].total_applications / pageSize);
    }
    return totalPages;
  }

  function createPageURL(page) {
    if (page < 1) {
      return null;
    }
    return `/api/applications?page=${page}&pageSize=${pageSize}`;
  }

  function createErrorResponse(error) {
    return {
      applications: null,
      pagination: null,
      error,
    };
  }

  function calculateStatesFilter(requiredState) {
    let result = [];

    requiredState = requiredState || '';
    const statusIndex = APPLICATION_STATE.findIndex(
      (status) => status === requiredState
    );

    if (statusIndex !== -1) {
      result.push(statusIndex + 1);
    } else {
      for (let x = 0; x < APPLICATION_STATE.length; x++) {
        result.push(x + 1);
      }
    }
    return result;
  }

  async function calculateGrantOfficersFilter(
    listGrantOfficers,
    requiredOfficer
  ) {
    const grantOfficersResponse = await listGrantOfficers();
    const allKnownGrantOfficers = grantOfficersResponse.grantOfficers.map(
      (grantOfficer) => grantOfficer.identifier
    );
    requiredOfficer = allKnownGrantOfficers.find(
      (officer) => officer === requiredOfficer
    );
    if (!requiredOfficer) {
      return allKnownGrantOfficers;
    }
    return [requiredOfficer];
  }
};

export default listApplications;
