import getDb from '../gateways/db';
import {
  APPLICATION_STATE,
  BUSINESS_SIZE,
  COMPANY_STRUCTURE,
  CONTACT_TYPE,
  SITE_DESCRIPTION,
  STATE_AID_OPTION,
} from 'lib/dbMapping';
import { APPLICATION_NOT_FOUND } from '../constants';

export default async ({ clientGeneratedId }) => {
  const dbInstance = await getDb.getInstance();
  let application = {};
  try {
    application = await getApplicationData(dbInstance, clientGeneratedId);
  } catch (error) {
    if (
      error.name === 'QueryResultError' &&
      // queryResultErrorCode.noData is 0, see https://github.com/vitaly-t/pg-promise/blob/master/lib/errors/query-result-error.js
      error.code === 0
    ) {
      return createErrorResponse(APPLICATION_NOT_FOUND);
    }
    return createErrorResponse(error.message);
  }
  const uploadedDocuments = await getDocuments(dbInstance, clientGeneratedId);
  return {
    application: {
      clientGeneratedId,
      applicationDate: new Date(application.date_time_recorded).toISOString(),
      status: APPLICATION_STATE[application.application_state_id - 1],
      grantAmountAwarded: application.grant_amount_awarded,
      eligibilityCriteria: {
        tradingInHackney: booleanToYesNo(application.trading_in_hackney),
        liableForRates: booleanToYesNo(application.liable_for_rates),
        isBusinessClosed: booleanToYesNo(application.is_business_closed),
      },
      eligibilityCriteriaDetails: {
        businessSizeId: BUSINESS_SIZE[application.business_size_id - 1],
        tradingOn220320: booleanToYesNo(application.tradingOn220320),
        tradingOn161020: booleanToYesNo(application.tradingOn161020),
        tradingOn041120: booleanToYesNo(application.tradingOn041120),
        howManyEmployees: application.how_many_employees,
      },
      contact: {
        contactTypeId: CONTACT_TYPE[application.contact_type_id - 1],
        firstName: application.first_name,
        lastName: application.last_name,
        emailAddress: application.email_address,
        telephoneNumber: application.telephone_number,
        address: {
          uprn: application.contact_address_uprn,
          firstLine: application.contact_address_first_line,
          secondLine: application.contact_address_second_line,
          thirdLine: application.contact_address_third_line,
          postcode: application.contact_address_postcode,
          ward: application.contact_address_ward,
        },
      },
      business: {
        companyStructureId:
          COMPANY_STRUCTURE[application.company_structure_id - 1],
        registeredName: application.registered_name,
        businessName: application.business_name,
        businessDescription: application.description,
        companyNumber: application.company_number,
        siteDescriptionId:
          SITE_DESCRIPTION[application.site_description_id - 1],
        fullTimeEmployees: application.full_time_employees,
        percentageFallInIncome: application.percent_fall_in_income,
        rateableValue: application.rateable_value,
        ratesAccountNumber: application.rates_account_number,
        registeredCharity: booleanToYesNo(application.registered_charity),
        councilRentAccountNumber: application.council_rent_account_number,
        councilTaxNumber: application.council_tax_number,
        businessAddress: {
          uprn:
            application.business_address_uprn === '0000000'
              ? ''
              : application.business_address_uprn,
          firstLine: application.business_address_first_line,
          secondLine: application.business_address_second_line,
          thirdLine: application.business_address_third_line,
          postcode:
            application.business_address_postcode === '00000'
              ? ''
              : application.business_address_postcode,
        },
      },
      turnover: {
        turnover: application.turnover_march_may_2020,
        year1819: application.turnover_2018_2019,
        year1920: application.turnover_2019_2020,
      },
      fixedPropertyCosts: {
        year2018To2019: application.fixed_property_costs_2018_2019,
        year2019To2020: application.fixed_property_costs_2019_2020,
        itemsIncluded: application.fixed_property_costs_items,
      },
      documents: uploadedDocuments,
      businessBankAccount: {
        bankName: application.bank_name,
        accountHolder: application.account_holder,
        accountNumber: application.account_number,
        accountSortcode: application.account_sortcode,
      },
      declaration: {
        stateAidOptionId: STATE_AID_OPTION[application.state_aid_option_id - 1],
        dateOfAid: application.date_of_aid
          ? new Date(application.date_of_aid).toISOString()
          : null,
        organisationProvidingAid: application.organisation_providing_aid,
        stateAidReceived: booleanToYesNo(application.state_aid_received),
        permittedToAcceptStateAidGrant: booleanToYesNo(
          application.permitted_to_accept_state_aid_grant
        ),
        readUnderstoodDeclaration: booleanToYesNo(
          application.read_understood_declaration
        ),
      },
    },
    validations: application.validations,
  };
};

const booleanToYesNo = (booleanValue) => (booleanValue === true ? 'Yes' : 'No');

const getApplicationData = async (dbInstance, clientGeneratedId) => {
  const query = `SELECT
                  -- grant_application
                  -- ga.id,
                  ga.client_generated_id,
                  ga.date_time_recorded,
                  -- eligibility_criteria
                  -- ec.id,
                  -- ec.grant_application_id,
                  ec.trading_in_hackney,
                  ec.liable_for_rates,
                  ec.is_business_closed,
                  -- eligibility_criteria_details
                  -- ecd.id,
                  -- ecd.grant_application_id,
                  ecd.business_size_id,
                  ecd.how_many_employees,
                  ecd.trading_on_22_03_20,
                  ecd.trading_on_16_10_20,
                  ecd.trading_on_04_11_20,
                  ecd.served_legal_notices,
                  ecd.business_category,
                  ecd.business_sub_category,
                  ecd.business_custom_category,
                  -- application_assessment
                  aa.id,
                  -- aa.grant_application_id,
                  aa.application_state_id,
                  aa.grant_amount_awarded,
                  -- Beware validations is text of JSON
                  aa.validations,
                  -- contact
                  -- c.id,
                  -- c.grant_application_id,
                  c.first_name,
                  c.last_name,
                  c.email_address,
                  c.telephone_number,
                  -- contact_address
                  -- ca.id,
                  ca.uprn AS contact_address_uprn,
                  ca.first_line AS contact_address_first_line,
                  ca.second_line AS contact_address_second_line,
                  ca.third_line AS contact_address_third_line,
                  ca.postcode AS contact_address_postcode,
                  -- ca.ward,
                  -- business
                  -- b.id,
                  -- b.grant_application_id,
                  b.business_name,
                  b.registered_name,
                  b.business_identify_type,
                  b.business_identify_number,
                  b.business_rates_account_number,
                  b.business_rates_payer,
                  b.business_annual_rent,
                  b.business_website,
                  -- business_address
                  -- ba.id,
                  -- ba.business_id,
                  ba.uprn AS business_address_uprn,
                  ba.first_line AS business_address_first_line,
                  ba.second_line AS business_address_second_line,
                  ba.third_line AS business_address_third_line,
                  ba.postcode AS business_address_postcode,
                  -- business_bank_account
                  -- bba.id,
                  -- bba.business_id,
                  bba.bank_name,
                  bba.account_holder,
                  bba.account_number,
                  bba.account_sortcode,
                  -- declaration d
                  -- d.id,
                  -- d.grant_application_id,
                  d.name,
                  d.contact_type_id,
                  d.authorise_on_behalf,
                  d.business_meets_criteria,
                  d.business_closed_by_law,
                  d.business_intends_reopen,
                  d.business_i_will_inform,
                  d.business_not_exceed,
                  d.business_not_undertaking,
                  d.business_not_rate_payer,
                  d.business_permit_data,
                  d.business_share_with_beis,
                  d.business_happy_contacted
              FROM
                  grant_application ga
                  JOIN
                      eligibility_criteria ec
                      ON ga.id = ec.grant_application_id
                  JOIN
                      eligibility_criteria_details ecd
                      ON ga.id = ecd.grant_application_id
                  JOIN
                      application_assessment aa
                      ON ga.id = aa.grant_application_id
                  JOIN
                      contact c
                      ON ga.id = c.grant_application_id
                  JOIN
                      contact_address ca
                      ON ga.id = c.grant_application_id
                  JOIN
                      business b
                      ON ga.id = b.grant_application_id
                  JOIN
                      business_address ba
                      ON ga.id = b.grant_application_id
                  JOIN
                      business_bank_account bba
                      ON ga.id = b.grant_application_id
                  JOIN
                      declaration d
                      ON ga.id = d.grant_application_id
              WHERE
                  ga.client_generated_id = $1;`;
  return await dbInstance.one(query, [clientGeneratedId]);
};

const getDocuments = async (dbInstance, clientGeneratedId) => {
  const query = `SELECT s3_path, document_type
                  FROM grant_application AS ga
                  JOIN document_upload AS du
                      ON ga.id = du.grant_application_id
                  WHERE ga.client_generated_id = $1
                  ORDER BY du.document_type;`;
  const documentData = await dbInstance.any(query, [clientGeneratedId]);
  let documents = [];

  documents = documentData.map((row) => ({
    s3Path: encodeURIComponent(row.s3_path),
    documentType: row.document_type,
  }));

  return documents;
};

const createErrorResponse = (error) => {
  return {
    applications: null,
    pagination: null,
    error,
  };
};
