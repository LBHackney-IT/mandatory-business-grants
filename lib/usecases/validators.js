import * as yup from 'yup';
//import * as options from 'lib/dbMapping';

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, {
    message: '${path} should have digits only',
    excludeEmptyString: true,
  });
});

const emptyStringNumber = (v, o) => (o === '' ? null : v);
const stringToBool = (v, o) => o === 'Yes';

const applicationSchema = yup.object().shape({
  declaration: yup
    .object()
    .shape({
      name: yup.string().required(),
      contactTypeId: yup.string().required(),
      authoriseOnBehalf: yup.bool().required(),
      businessMeetsCriteria: yup.bool().required(),
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
      bankStatement: yup.array().of(yup.string().required()).required(),
      ratesBill: yup.array().of(yup.string().required()),
    })
    .required(),
  business: yup
    .object()
    .shape({
      businessName: yup.string().required(),
      registeredName: yup.string(),
      businessIdentifyType: yup.string().required(),
      businessIdentifyNumber: yup.string().required(),
      businessRatesAccountNumber: yup
        .string()
        .matches(/^6(\d{8}|\d{7}x)$/i)
        .required(),
      businessRatesPayer: yup.string().required(),
      businessTradingAddress: yup
        .object()
        .shape({
          buildName: yup.string(),
          streetNumber: yup.string().required(),
          street: yup.string().required(),
          town: yup.string().required(),
          postcode: yup.string().required(),
        })
        .required(),
      businessAddress: yup
        .object()
        .shape({
          buildName: yup.string(),
          streetNumber: yup.string().required(),
          street: yup.string().required(),
          town: yup.string().required(),
          postcode: yup.string().required(),
        })
        .required(),
      businessAnnualRent: yup.number().transform(emptyStringNumber).required(),
      businessWebsite: yup.string(),
    })
    .required(),
  contact: yup
    .object()
    .shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      emailAddress: yup.string().email().required(),
      telephoneNumber: yup.string().integer().required(),
      address: yup
        .object()
        .shape({
          buildName: yup.string(),
          streetNumber: yup.string().required(),
          street: yup.string().required(),
          town: yup.string().required(),
          postcode: yup.string().required(),
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
    })
    .required(),
  eligibilityCriteriaDetails: yup
    .object()
    .shape({
      businessSizeId: yup.string().required(),
      howManyEmployees: yup.string().integer().required(),
      businessCategory: yup.string().required(),
      businessSubCategory: yup.string().required(),
      businessCustomCategory: yup.string(),
      tradingOn220320: yup.bool().transform(stringToBool).required(),
      tradingOn161020: yup.bool().transform(stringToBool).required(),
      tradingOn041120: yup.bool().transform(stringToBool).required(),
      tradingOn301120: yup.bool().transform(stringToBool).required(),
      tradingOn011220Open: yup.bool().transform(stringToBool).required(),
      tradingOn011220: yup.bool().transform(stringToBool).required(),
      tradingOn151220: yup.bool().transform(stringToBool).required(),
      tradingOn191220: yup.bool().transform(stringToBool).required(),
      tradingOn040121: yup.bool().transform(stringToBool).required(),
      servedLegalNotices: yup.bool().transform(stringToBool).required(),
    })
    .required(),
});

export default (data) => applicationSchema.validate(data);
