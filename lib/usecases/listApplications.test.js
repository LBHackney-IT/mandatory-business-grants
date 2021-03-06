import * as faker from 'faker';
import listApplications from './listApplications';
import { APPLICATION_STATE } from 'lib/dbMapping';

function createContainerAndSpies(numberOfApplicationsInResponse) {
  const applicationsDatabaseResponse = [];
  for (let count = 1; count <= numberOfApplicationsInResponse; count++) {
    applicationsDatabaseResponse.push({
      date_time_recorded: '2020-06-16T06:16:19.640Z',
      client_generated_id: `ClientGeneratedId${count}`,
      business_name: `Business Name ${count}`,
      status: 'Unprocessed',
      closed_grant_exported: true,
      open_grant_exported: true,
      open_version_2_grant_exported: true,
      sector_grant_exported: true,
      csp_grant_exported: true,
      cblg_grant_exported: true,
      closed_tier_2_grant_exported: true,
      closed_tier_3_grant_exported: true,
      closed_tier_4_grant_exported: true,
      closed_5_jan_grant_exported: true,
    });
  }

  const grantOfficersResponse = { grantOfficers: [] };
  const expectedGrantOfficers = [];
  for (let x = 1; x <= 3; x++) {
    const identifier =
      `${faker.name.firstName()} ${faker.name.lastName()}` +
      ` <${faker.internet.exampleEmail()}>`;
    expectedGrantOfficers.push(identifier);
    grantOfficersResponse.grantOfficers.push({ identifier });
  }

  const databaseSpy = jest.fn();
  databaseSpy.mockReturnValueOnce(applicationsDatabaseResponse);

  const listGrantOfficersSpy = jest.fn();
  listGrantOfficersSpy.mockReturnValueOnce(grantOfficersResponse);

  const container = {
    async getDbInstance() {
      return {
        any: databaseSpy,
      };
    },
    getListGrantOfficers() {
      return listGrantOfficersSpy;
    },
  };
  return { databaseSpy, container, expectedGrantOfficers };
}

describe('listApplications', () => {
  // Todo: Test that the correct errors are returned when nonsense passed in or something goes wrong.

  test('returns a JSON object containing the applications', async () => {
    const { databaseSpy, container } = createContainerAndSpies(10);

    const { applications, error } = await listApplications(container)({
      currentPage: 1,
      pageSize: 10,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(expect.anything(), {
      pageSize: 10,
      offset: 0,
      statesFilter: expect.anything(),
      grantOfficerFilter: expect.anything(),
      clientGeneratedIdFilter: expect.anything(),
    });
    expect(applications).toHaveLength(10);
    expect(applications[0]).toEqual({
      clientGeneratedId: 'ClientGeneratedId1',
      businessName: 'Business Name 1',
      applicationDate: '2020-06-16T06:16:19.640Z',
      status: 'Unprocessed',
      exported:
        'LRSG Closed, LRSG Open, LRSG Open Version 2, LRSG Sector, CSP, CBLG, LRSG Closed (Tier 2), LRSG Closed (Tier 3), LRSG Closed (Tier 4), LRSG Closed (5 Jan)',
    });
    expect(applications[9]).toEqual({
      clientGeneratedId: 'ClientGeneratedId10',
      businessName: 'Business Name 10',
      applicationDate: '2020-06-16T06:16:19.640Z',
      status: 'Unprocessed',
      exported:
        'LRSG Closed, LRSG Open, LRSG Open Version 2, LRSG Sector, CSP, CBLG, LRSG Closed (Tier 2), LRSG Closed (Tier 3), LRSG Closed (Tier 4), LRSG Closed (5 Jan)',
    });
  });

  test('defaults currentPage to 1 and pageSize to 10', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        pageSize: 10,
        offset: 0,
      })
    );
  });

  test('passes through currentPage and pageSize', async () => {
    const { databaseSpy, container } = createContainerAndSpies(10);

    const { error } = await listApplications(container)({
      currentPage: 2,
      pageSize: 3,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        pageSize: 3,
        offset: 3,
      })
    );
  });

  test('defaults sort param to +applicationDate', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY ga.date_time_recorded ASC'),
      expect.anything()
    );
  });

  test('passes through sort param', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({
      sort: '+businessName',
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY LOWER(b.business_name) ASC'),
      expect.anything()
    );
  });

  test('sets sort ascending for +...', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({
      sort: '+businessName',
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY LOWER(b.business_name) ASC'),
      expect.anything()
    );
  });

  test('sets sort ascending for -...', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({
      sort: '-businessName',
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('ORDER BY LOWER(b.business_name) DESC'),
      expect.anything()
    );
  });

  test('limit and offset parameters are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('LIMIT $(pageSize) OFFSET $(offset)'),
      expect.anything()
    );
  });

  test('application state ids are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('WHERE aa.application_state_id IN '),
      expect.anything()
    );
  });

  test('when status is undefined all known states is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({ status: undefined });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        statesFilter: expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      })
    );
  });

  test('when status is defined & found, only that status is queried', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);
    const statusIndex = 0;
    const desiredStatus = APPLICATION_STATE[statusIndex];
    const expectedStatus = statusIndex + 1;

    const { error } = await listApplications(container)({
      status: desiredStatus,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        statesFilter: expect.arrayContaining([expectedStatus]),
      })
    );
  });

  test('when businessCategory is defined & found, only that businessCategory is queried', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const businessCategory = 'retail';
    const { error } = await listApplications(container)({
      businessCategory,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        businessCategory,
      })
    );
  });

  test('when businessCategory and businessSubcategory are specified, the subcategory is queried', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const businessCategory = 'retail';
    const businessSubcategory = 'clothing';
    const { error } = await listApplications(container)({
      businessCategory,
      businessSubcategory,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        businessCategory,
        businessSubcategory,
      })
    );
  });

  test('grant officers are included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'WHERE user_recorded IN ($(grantOfficerFilter:list))'
      ),
      expect.anything()
    );
  });

  test('when grantOfficer is undefined a list of known grantOfficer are included in the query', async () => {
    const {
      databaseSpy,
      container,
      expectedGrantOfficers,
    } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({
      grantOfficer: undefined,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        grantOfficerFilter: expect.arrayContaining(expectedGrantOfficers),
      })
    );
  });

  test('when grantOfficer is defined & found, only that grantOfficer is queried', async () => {
    const {
      databaseSpy,
      container,
      expectedGrantOfficers,
    } = createContainerAndSpies(0);
    const expectedGrantOfficer = expectedGrantOfficers.pop();

    const { error } = await listApplications(container)({
      grantOfficer: expectedGrantOfficer,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        grantOfficerFilter: expect.arrayContaining([expectedGrantOfficer]),
      })
    );
  });

  test('clientGeneratedId is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({});

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.stringContaining('AND ga.client_generated_id LIKE '),
      expect.anything()
    );
  });

  test('when clientGeneratedId is undefined a wildcard is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);

    const { error } = await listApplications(container)({
      clientGeneratedId: undefined,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        clientGeneratedIdFilter: '%',
      })
    );
  });

  test('when clientGeneratedId is defined, clientGeneratedId is included in the query', async () => {
    const { databaseSpy, container } = createContainerAndSpies(0);
    const clientGeneratedId = faker.random.uuid();

    const { error } = await listApplications(container)({
      clientGeneratedId,
    });

    expect(error).toBeNull();
    expect(databaseSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        clientGeneratedIdFilter: clientGeneratedId,
      })
    );
  });
});
