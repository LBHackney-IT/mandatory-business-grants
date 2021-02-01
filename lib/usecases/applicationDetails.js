import getDb from '../gateways/db';
import { APPLICATION_STATE, BUSINESS_SIZE, CONTACT_TYPE } from 'lib/dbMapping';
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
      lrsgClosedBusinessesAmount: application.lrsg_closed_businesses_amount,
      lrsgSectorAmount: application.lrsg_sector_amount,
      lrsgOpenAmount: application.lrsg_open_amount,
      lrsgOpenVersion2Amount: application.lrsg_open_version_2_amount,
      cspAmount: application.csp_amount,
      cblgAmount: application.cblg_amount,
      lrsgClosedTier2Amount: application.lrsg_closed_tier_2_amount,
      lrsgClosedTier3Amount: application.lrsg_closed_tier_3_amount,
      lrsgClosedTier4Amount: application.lrsg_closed_tier_4_amount,
      lrsgClosed5JanAmount: application.lrsg_closed_5_jan_amount,
      lrsgClosedBusinessesPaymentExported:
        application.lrsg_closed_businesses_payment_exported,
      lrsgSectorPaymentExported: application.lrsg_sector_payment_exported,
      lrsgOpenPaymentExported: application.lrsg_open_payment_exported,
      lrsgOpenVersion2PaymentExported:
        application.lrsg_open_version_2_payment_exported,
      cspPaymentExported: application.csp_payment_exported,
      cblgPaymentExported: application.cblg_payment_exported,
      lrsgClosedTier2PaymentExported:
        application.lrsg_closed_tier_2_payment_exported,
      lrsgClosedTier3PaymentExported:
        application.lrsg_closed_tier_3_payment_exported,
      lrsgClosedTier4PaymentExported:
        application.lrsg_closed_tier_4_payment_exported,
      lrsgClosed5JanPaymentExported:
        application.lrsg_closed_5_jan_payment_exported,
      eligibilityCriteria: {
        tradingInHackney: application.trading_in_hackney,
        liableForRates: application.liable_for_rates,
      },
      eligibilityCriteriaDetails: {
        businessSizeId: BUSINESS_SIZE[application.business_size_id - 1],
        howManyEmployees: application.how_many_employees,
        businessCategory: {
          businessCategory: application.business_category,
          businessSubCategory: application.business_sub_category,
          businessCustomCategory: application.business_custom_category,
        },
        tradingOn220320: application.trading_on_22_03_20,
        tradingOn161020: application.trading_on_16_10_20,
        tradingOn041120: application.trading_on_04_11_20,
        tradingOn011220Open: application.trading_on_01_12_20_open,
        tradingOn011220: application.trading_on_01_12_20,
        tradingOn151220: application.trading_on_15_12_20,
        tradingOn191220: application.trading_on_19_12_20,
        tradingOn301120: application.trading_on_30_11_20,
        servedLegalNotices: application.served_legal_notices,
      },
      contact: {
        firstName: application.first_name,
        lastName: application.last_name,
        emailAddress: application.email_address,
        telephoneNumber: application.telephone_number,
        address: {
          buildName: application.contact_address_first_line,
          streetNumber: application.contact_address_second_line,
          street: application.contact_address_third_line,
          town: application.contact_address_ward,
          postcode: application.contact_address_postcode,
        },
        dateOfBirth: application.date_of_birth,
      },
      business: {
        businessName: application.business_name,
        registeredName: application.registered_name,
        businessIdentifyType: `${application.business_identify_type} - ${application.business_identify_number}`,
        businessRatesAccountNumber: application.business_rates_account_number,
        businessRatesPayer: application.business_rates_payer,
        businessTradingAddress: {
          buildName: application.business_trading_address_first_line,
          streetNumber: application.business_trading_address_second_line,
          street: application.business_trading_address_third_line,
          town: application.business_trading_address_ward,
          postcode: application.business_trading_address_postcode,
        },
        businessAddress: {
          buildName: application.business_address_first_line,
          streetNumber: application.business_address_second_line,
          street: application.business_address_third_line,
          town: application.business_address_ward,
          postcode: application.business_address_postcode,
        },
        businessAnnualRent: application.business_annual_rent,
        businessWebsite: application.business_website,
      },
      documents: uploadedDocuments,
      businessBankAccount: {
        bankName: application.bank_name,
        accountHolder: application.account_holder,
        accountNumber: application.account_number,
        accountSortcode: application.account_sortcode,
      },
      declaration: {
        name: application.name,
        contactTypeId: CONTACT_TYPE[application.contact_type_id - 1],
        authoriseOnBehalf: application.authorise_on_behalf,
        businessMeetsCriteria: application.business_meets_criteria,
        businessIntendsReopen: application.business_intends_reopen,
        businessIWillInform: application.business_i_will_inform,
        businessNotExceed: application.business_not_exceed,
        businessNotUndertaking: application.business_not_undertaking,
        businessNotRatePayer: application.business_not_rate_payer,
        businessPermitData: application.business_permit_data,
        businessShareWithBEIS: application.business_share_with_beis,
        businessHappyContacted: application.business_happy_contacted,
      },
    },
    validations: application.validations,
  };
};

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
                  -- eligibility_criteria_details
                  -- ecd.id,
                  -- ecd.grant_application_id,
                  ecd.business_size_id,
                  ecd.how_many_employees,
                  ecd.trading_on_22_03_20,
                  ecd.trading_on_16_10_20,
                  ecd.trading_on_04_11_20,
                  ecd.trading_on_30_11_20,
                  ecd.trading_on_01_12_20_open,
                  ecd.trading_on_01_12_20,
                  ecd.trading_on_15_12_20,
                  ecd.trading_on_19_12_20,
                  ecd.served_legal_notices,
                  ecd.business_category,
                  ecd.business_sub_category,
                  ecd.business_custom_category,
                  -- application_assessment
                  aa.id,
                  -- aa.grant_application_id,
                  aa.application_state_id,
                  aa.lrsg_closed_businesses_amount,
                  aa.lrsg_sector_amount,
                  aa.lrsg_open_amount,
                  aa.lrsg_open_version_2_amount,
                  aa.csp_amount,
                  aa.cblg_amount,
                  aa.lrsg_closed_tier_2_amount,
                  aa.lrsg_closed_tier_3_amount,
                  aa.lrsg_closed_tier_4_amount,
                  aa.lrsg_closed_5_jan_amount,
                  aa.lrsg_closed_businesses_payment_exported,
                  aa.lrsg_sector_payment_exported,
                  aa.lrsg_open_payment_exported,
                  aa.lrsg_open_version_2_payment_exported,
                  aa.csp_payment_exported,
                  aa.cblg_payment_exported,
                  aa.lrsg_closed_tier_2_payment_exported,
                  aa.lrsg_closed_tier_3_payment_exported,
                  aa.lrsg_closed_tier_4_payment_exported,
                  aa.lrsg_closed_5_jan_payment_exported,
                  -- Beware validations is text of JSON
                  aa.validations,
                  -- contact
                  -- c.id,
                  -- c.grant_application_id,
                  c.first_name,
                  c.last_name,
                  c.email_address,
                  c.date_of_birth,
                  c.telephone_number,
                  -- contact_address
                  -- ca.id,
                  ca.first_line AS contact_address_first_line,
                  ca.second_line AS contact_address_second_line,
                  ca.third_line AS contact_address_third_line,
                  ca.postcode AS contact_address_postcode,
                  ca.ward AS contact_address_ward,
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
                  ba.first_line AS business_address_first_line,
                  ba.second_line AS business_address_second_line,
                  ba.third_line AS business_address_third_line,
                  ba.postcode AS business_address_postcode,
                  ba.ward AS business_address_ward,
                  bta.first_line AS business_trading_address_first_line,
                  bta.second_line AS business_trading_address_second_line,
                  bta.third_line AS business_trading_address_third_line,
                  bta.postcode AS business_trading_address_postcode,
                  bta.ward AS business_trading_address_ward,
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
                      ON ga.id = ca.grant_application_id
                  JOIN
                      business b
                      ON ga.id = b.grant_application_id
                  JOIN
                      business_address ba
                      ON ga.id = ba.grant_application_id
                  JOIN
                      business_trading_address bta
                      ON ga.id = bta.grant_application_id
                  JOIN
                      business_bank_account bba
                      ON ga.id = bba.grant_application_id
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
