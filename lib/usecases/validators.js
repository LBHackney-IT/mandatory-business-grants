import * as yup from 'yup';
//import * as options from 'lib/dbMapping';

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, {
    message: '${path} should have digits only',
    excludeEmptyString: true,
  });
});

//const emptyStringNumber = (v, o) => (o === '' ? null : v);
const stringToBool = (v, o) => o === 'Yes';

const applicationSchema = yup.object().shape({
  declaration: yup
    .object()
    .shape({
      name: yup.string().required(),
      contactTypeId: yup.string().required(),
      authoriseOnBehalf: yup.bool().required(),
      businessMeetsCriteria: yup.bool().required(),
      businessClosedByLaw: yup.bool().required(),
      businessIntendsReopen: yup.bool().required(),
      businessIWillInform: yup.bool().required(),
      businessNotExceed: yup.bool().required(),
      businessNotUndertaking: yup.bool().required(),
      businessNotRatePayer: yup.bool().required(),
      businessPermitData: yup.bool().required(),
      businessShareWithBEIS: yup.bool().required(),
      businessHappyContacted: yup.bool().required(),
    })
    .required(),
  businessBankAccount: yup
    .object()
    .shape({
      bankName: yup.string().required(),
      accountHolder: yup.string().required(),
      accountNumber: yup.string().min(8).max(8).integer().required(),
      accountSortcode: yup.string().integer().min(6).max(6).required(),
    })
    .required(),
  supplementaryInformation: yup
    .object()
    .shape({
      bankStatement: yup.array().required(),
      RatesBill: yup.array().required(),
    })
    .required(),
  fixedPropertyCosts: yup
    .object()
    .shape({
      itemsIncluded: yup.string().nullable(),
      year2019To2020: yup.string().nullable(),
      year2018To2019: yup.string().nullable(),
    })
    .required(),
  turnover: yup
    .object()
    .shape({
      year1920: yup.string().nullable(),
      year1819: yup.string().nullable(),
      turnover: yup.string().nullable(),
    })
    .required(),
  business: yup
    .object()
    .shape({
      businessName: yup.string().required(),
      registeredName: yup.string().required(),
      businessIdentifyType: yup.string().required(),
      businessIdentifyNumber: yup.string().required(),
      businessRatesAccountNumber: yup.string().integer().required(),
      businessRatesPayer: yup.string().required(),
      businessTradingAddress: yup.object(), //need more details
      businessAddress: yup
        .object()
        .shape({
          firstLine: yup.string(),
          secondLine: yup.string(),
          thirdLine: yup.string(),
          ward: yup.string(),
          uprn: yup.string().integer(),
          postcode: yup.string(),
        })
        .required(),
      businessAnnualRent: yup.number().required(),
      businessWebsite: yup.string().required(),
    })
    .required(),
  contact: yup
    .object()
    .shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      emailAddress: yup.string().email().required(),
      telephoneNumber: yup.string().integer(),
      address: yup
        .object()
        .shape({
          firstLine: yup.string(),
          secondLine: yup.string(),
          thirdLine: yup.string(),
          ward: yup.string(),
          uprn: yup.string().integer(),
          postcode: yup.string(),
        })
        .required(),
      dateOfBirth: yup.string(),
    })
    .required(),
  eligibilityCriteria: yup
    .object()
    .shape({
      tradingInHackney: yup.bool().transform(stringToBool),
      liableForRates: yup.bool().transform(stringToBool),
      isBusinessClosed: yup.bool().transform(stringToBool),
    })
    .required(),
  eligibilityCriteriaDetails: yup
    .object()
    .shape({
      businessSizeId: yup.string().required(),
      howManyEmployees: yup.string().integer().required(),
      typeOfBusinessId: yup.string().required(),
      tradingOn220320: yup.bool().transform(stringToBool).required(),
      tradingOn161020: yup.bool().transform(stringToBool).required(),
      tradingOn041120: yup.bool().transform(stringToBool).required(),
      servedLegalNotices: yup.bool().transform(stringToBool).required(),
    })
    .required(),
});

export default (data) => applicationSchema.validate(data);
