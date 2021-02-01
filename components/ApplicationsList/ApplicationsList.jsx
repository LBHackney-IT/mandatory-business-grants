import { useState, useEffect, useMemo, useCallback } from 'react';
import Router, { useRouter } from 'next/router';

import Table from 'components/Table/Table';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { BasicSelect, TextInput } from 'components/Form';
import { fetchApplications, patchApplications } from 'utils/api/applications';

import { APPLICATION_STATE, BUSINESS_CATEGORIES } from 'lib/dbMapping';
import { fetchGrantOfficers } from '../../utils/api/grantOfficers';

const ApplicationsList = ({
  page,
  pageSize,
  sort,
  status,
  grantOfficer,
  businessCategory,
  businessSubcategory,
  applicationId,
  groups,
  csvDownloadGroup,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Business Name',
        accessor: 'businessName',
      },
      {
        Header: 'Application Id',
        accessor: 'clientGeneratedId',
        disableSortBy: true,
      },
      {
        Header: 'Submission',
        accessor: 'applicationDate',
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: 'Exported for Payment',
        accessor: 'exported',
        disableSortBy: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
      },
    ],
    []
  );
  const [filters, setFilters] = useState({
    status,
    grantOfficer,
    applicationId,
    businessCategory,
    businessSubcategory,
  });
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [officers, setOfficers] = useState([]);
  const checkFilter = JSON.stringify(filters);
  const canDownloadCsvs = groups.includes(csvDownloadGroup);
  const csvExportProps = {};
  if (!canDownloadCsvs) {
    csvExportProps.disabled = true;
  }

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        setError(null);
        const data = await fetchGrantOfficers();
        setOfficers(data.grantOfficers.map(({ identifier }) => identifier));
      } catch (e) {
        setError(e.response.data);
        setOfficers(null);
      }
    };
    fetchOfficers();
  }, []);
  useEffect(() => {
    fetchData(filters);
  }, [checkFilter]);
  const setValues = useCallback((state) =>
    setFilters({ ...filters, ...state })
  );
  const fetchData = useCallback(
    async ({ pageSize, pageIndex, sortBy, ...otherFilters }) => {
      if (isNaN(pageSize)) {
        return;
      }
      setLoading(true);
      const query = {
        page: pageIndex + 1,
        pageSize,
        sort: sortBy && `${sortBy.desc ? '-' : '+'}${sortBy.id}`,
        ...otherFilters,
      };
      await Router.push(
        '/admin',
        {
          pathname: '/admin',
          query,
        },
        { shallow: true }
      );
      try {
        setError(null);
        const { applications, pagination } = await fetchApplications(query);
        setData(applications);
        setPageCount(pagination.totalPages);
        setLoading(false);
      } catch (e) {
        e.response.status === 400
          ? setValues({ pageIndex: 0, pageSize, sortBy, ...otherFilters })
          : setError(e.response.data);
      }
    },
    []
  );
  const handleCsvDownload = async ({ grant_type }) => {
    try {
      setError(null);
      const csv = await patchApplications({
        grant_type: grant_type,
      });
      window.open(encodeURI(`data:text/csv;charset=utf-8,${csv}`));
    } catch (e) {
      e.response.status = 400;
      setError(e.response.data);
    }
  };
  return !error ? (
    <>
      <BasicSelect
        options={APPLICATION_STATE}
        label="Filter by Status:"
        value={filters.status}
        onChange={(status) => setValues({ status })}
      />

      {officers && (
        <BasicSelect
          options={officers}
          label="Filter by Grant Officer:"
          value={filters.grantOfficer}
          onChange={(grantOfficer) => setValues({ grantOfficer })}
        />
      )}

      <BasicSelect
        options={Object.keys(BUSINESS_CATEGORIES)}
        label="Filter by Business Category:"
        value={filters.businessCategory}
        onChange={(businessCategory) => setValues({ businessCategory })}
      />

      {filters.businessCategory && (
        <BasicSelect
          options={BUSINESS_CATEGORIES[filters.businessCategory]}
          label="Filter by Business Subcategory:"
          value={filters.businessSubcategory}
          onChange={(businessSubcategory) => setValues({ businessSubcategory })}
        />
      )}

      <TextInput
        name="searchByApplicationId"
        label="Search by Application ID"
        value={filters.applicationId}
        onChange={(applicationIdEvent) => {
          setValues({ applicationId: applicationIdEvent.target.value });
        }}
      />
      <Table
        columns={columns}
        data={data}
        fetchData={setValues}
        loading={loading}
        pageCount={pageCount}
        initialPage={page}
        initialPageSize={pageSize}
        initialSortBy={sort ? sort : '+applicationDate'}
      />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <p>
        <a href="/api/csv/applications" target="_blank">
          Download Applications CSV
        </a>
      </p>
      <p>
        <a href="/api/csv/uncontactable" target="_blank">
          Download Uncontactable Applications CSV
        </a>
      </p>
      <h2>Export payment details</h2>
      <p>
        <p>
          {!canDownloadCsvs &&
            `These downloads are disabled as you are not part of the '${csvDownloadGroup}' user group`}
        </p>
        <button
          className="govuk-button govuk-button--secondary govuk-!-margin-right-1"
          data-module="govuk-button"
          onClick={() =>
            handleCsvDownload({ grant_type: 'lrsg_closed_businesses' })
          }
          {...csvExportProps}
        >
          Export LRSG (Closed) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() => handleCsvDownload({ grant_type: 'lrsg_sector' })}
          {...csvExportProps}
        >
          Export LRSG (Sector) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() => handleCsvDownload({ grant_type: 'lrsg_open' })}
          {...csvExportProps}
        >
          Export LRSG (Open) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() =>
            handleCsvDownload({ grant_type: 'lrsg_open_version_2' })
          }
          {...csvExportProps}
        >
          Export LRSG (Open) Version 2 Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() => handleCsvDownload({ grant_type: 'csp' })}
          {...csvExportProps}
        >
          Export CSP Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() =>
            handleCsvDownload({ grant_type: 'lrsg_closed_tier_2' })
          }
          {...csvExportProps}
        >
          Export LRSG Closed (Tier 2) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() =>
            handleCsvDownload({ grant_type: 'lrsg_closed_tier_3' })
          }
          {...csvExportProps}
        >
          Export LRSG Closed (Tier 3) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() =>
            handleCsvDownload({ grant_type: 'lrsg_closed_tier_4' })
          }
          {...csvExportProps}
        >
          Export LRSG Closed (Tier 4) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() => handleCsvDownload({ grant_type: 'lrsg_closed_5_jan' })}
          {...csvExportProps}
        >
          Export LRSG Closed (5 Jan) Panel Approved Payments
        </button>
        <br />

        <button
          className="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          onClick={() => handleCsvDownload({ grant_type: 'cblg' })}
          {...csvExportProps}
        >
          Export CBLG Panel Approved Payments
        </button>
        <br />
      </p>
    </>
  ) : (
    <ErrorMessage text={error} />
  );
};

export function getQueryParametersAsObject() {
  const nextRouter = useRouter();
  const queryString = nextRouter.asPath.split(/\?/)[1];

  return Object.fromEntries(new URLSearchParams(queryString));
}

export default ApplicationsList;
