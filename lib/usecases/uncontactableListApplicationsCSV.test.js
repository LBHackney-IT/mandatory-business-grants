import uncontactableListApplicationsCSV from './uncontactableListApplicationsCSV';

function createContainerAndDatabaseSpy(numberOfApplicationsInResponse) {
  const databaseSpy = jest.fn(() => {
    const databaseResponse = [];
    for (let count = 1; count <= numberOfApplicationsInResponse; count++) {
      databaseResponse.push({
        client_generated_id: `ClientGeneratedId${count}`,
        business_name: `business_name${count}`,
      });
    }
    return databaseResponse;
  });

  const container = {
    async getDbInstance() {
      return {
        any: databaseSpy,
      };
    },
  };
  return { databaseSpy, container };
}

describe('uncontactableListApplicationsCSV', () => {
  test('returns a CSV object containing all applications', async () => {
    const { databaseSpy, container } = createContainerAndDatabaseSpy(10);

    const { csvString } = await uncontactableListApplicationsCSV(container)();

    expect(databaseSpy).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
    expect(csvString).toEqual(expect.stringContaining('ClientGeneratedId1,'));
    expect(csvString).toEqual(expect.stringContaining(',business_name1'));

    expect(csvString).toEqual(expect.stringContaining('ClientGeneratedId10,'));
    expect(csvString).toEqual(expect.stringContaining(',business_name10'));
  });

  test('column headers are present', async () => {
    const { container } = createContainerAndDatabaseSpy(1);
    const expectedHeaderColumns = ['client_generated_id', 'business_name'];

    const { csvString } = await uncontactableListApplicationsCSV(container)();
    const generatedHeaderColumns = csvString.split('\n').shift().split(',');

    expect(generatedHeaderColumns).toEqual(
      expect.arrayContaining(expectedHeaderColumns)
    );
  });
});
