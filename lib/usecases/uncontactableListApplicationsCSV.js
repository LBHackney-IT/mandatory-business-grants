const ObjectsToCsv = require('objects-to-csv');

const uncontactableListApplicationsCSV = ({ getDbInstance }) => async () => {
  const db = await getDbInstance();
  const query = `
    SELECT
      ga.client_generated_id,
      b.business_name
    FROM
      grant_application ga
      JOIN
          application_assessment apa
          ON ga.id = apa.grant_application_id
      JOIN
          business b
          ON ga.id = b.grant_application_id
      JOIN
          declaration d
          ON ga.id = d.grant_application_id
    WHERE
      d.business_happy_contacted = FALSE;`;

  const applications = await db.any(query);

  const results = applications.map((application) => ({
    client_generated_id: application.client_generated_id,
    business_name: application.business_name,
  }));

  const csvString = await new ObjectsToCsv(results).toString();

  return {
    csvString,
    error: null,
  };
};

export default uncontactableListApplicationsCSV;
