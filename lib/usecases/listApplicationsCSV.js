const ObjectsToCsv = require('objects-to-csv');

const listApplicationsCSV = ({ getDbInstance }) => async () => {
  const db = await getDbInstance();
  const query = `
    SELECT
      ga.client_generated_id,
      apst.description as application_status,
      b.business_name as business_trading_name,
      b.registered_name as business_registered_name,
      b.business_identify_type as business_identifying_number_type,
      b.business_identify_number as business_identifying_number,
      bs.description AS business_size,
      ecd.business_sub_category,
      ecd.business_custom_category,
      ecd.trading_on_22_03_20 as lrsg_sector,
      ecd.trading_on_16_10_20 as lrsg_open,
      ecd.trading_on_04_11_20 as lrsg_closed_businesses,
      ecd.trading_on_01_12_20_open as lrsg_open_v2,
      ecd.trading_on_01_12_20 as lrsg_closed_tier_2,
      ecd.trading_on_15_12_20 as lrsg_closed_tier_3,
      ecd.trading_on_19_12_20 as lrsg_closed_tier_4,
      ecd.trading_on_30_11_20 as csp,
      ecd.trading_on_04_01_21 as lrsg_closed_5_jan_and_cblg,
      ecd.trading_on_04_01_21_cycle_2 as lrsg_closed_5_jan_cycle_2,
      c.first_name AS contact_first_name,
      c.last_name AS contact_last_name,
      c.date_of_birth,
      c.email_address AS contact_email_address,
      c.telephone_number AS contact_telephone_number,
      b.business_rates_account_number,
      bta.first_line as building_name_floor_unit,
      bta.second_line as street_number,
      bta.third_line as street,
      bta.ward as town,
      bta.postcode AS business_post_code,
      bba.bank_name,
      bba.account_holder AS bank_account_holder_name,
      bba.account_number AS bank_account_number,
      bba.account_sortcode AS bank_sort_code
    FROM
      grant_application ga
      JOIN
          application_assessment apa
          ON ga.id = apa.grant_application_id
      JOIN
          application_state apst
          ON apst.id = apa.application_state_id
      JOIN
          eligibility_criteria ec
          ON ga.id = ec.grant_application_id
      JOIN
          eligibility_criteria_details ecd
          ON ga.id = ecd.grant_application_id
      JOIN
          business_size bs
          ON bs.id = ecd.business_size_id
      JOIN
          contact c
          ON ga.id = c.grant_application_id
      JOIN
          business b
          ON ga.id = b.grant_application_id
      JOIN
          business_trading_address bta
          ON ga.id = bta.grant_application_id
      JOIN
          business_bank_account bba
          ON ga.id = bba.grant_application_id
    ORDER BY
      ga.id ASC;`;

  const applications = await db.any(query);

  const results = applications.map((application) => ({
    client_generated_id: application.client_generated_id,
    application_status: application.application_status,
    business_trading_name: application.business_trading_name,
    business_registered_name: application.business_registered_name,
    business_identifying_number_type:
      application.business_identifying_number_type,
    business_identifying_number: application.business_identifying_number,
    business_size: application.business_size,
    business_sub_category: application.business_sub_category,
    business_custom_category: application.business_custom_category,
    lrsg_sector: convertBooleanToString(application.lrsg_sector),
    lrsg_open: convertBooleanToString(application.lrsg_open),
    lrsg_closed_businesses: convertBooleanToString(
      application.lrsg_closed_businesses
    ),
    lrsg_open_v2: convertBooleanToString(application.lrsg_open_v2),
    lrsg_closed_tier_2: convertBooleanToString(application.lrsg_closed_tier_2),
    lrsg_closed_tier_3: convertBooleanToString(application.lrsg_closed_tier_3),
    lrsg_closed_tier_4: convertBooleanToString(application.lrsg_closed_tier_4),
    csp: convertBooleanToString(application.csp),
    lrsg_closed_5_jan_and_cblg: convertBooleanToString(
      application.lrsg_closed_5_jan_and_cblg
    ),
    lrsg_closed_5_jan_cycle_2: convertBooleanToString(
      application.lrsg_closed_5_jan_cycle_2
    ),
    contact_first_name: application.contact_first_name,
    contact_last_name: application.contact_last_name,
    date_of_birth: application.date_of_birth,
    contact_email_address: application.contact_email_address,
    contact_telephone_number: application.contact_telephone_number,
    business_rates_account_number: application.business_rates_account_number,
    building_name_floor_unit: application.building_name_floor_unit,
    street_number: application.street_number,
    street: application.street,
    town: application.town,
    business_post_code: application.business_post_code,
    bank_name: application.bank_name,
    bank_account_holder_name: application.bank_account_holder_name,
    bank_account_number: application.bank_account_number,
    bank_sort_code: application.bank_sort_code,
  }));

  const csvString = await new ObjectsToCsv(results).toString();

  return {
    csvString,
    error: null,
  };
};

const convertBooleanToString = (value) => {
  let result = '';

  if (value === null) {
    result = 'N/A';
  } else {
    result = value ? 'Yes' : 'No';
  }

  return result;
};

export default listApplicationsCSV;
