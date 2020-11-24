import isValid from 'date-fns/isValid';
import isPast from 'date-fns/isPast';

import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import EligibilityCriteriaDetails from 'components/Steps/EligibilityCriteriaDetails';
import SupplementaryInformation from 'components/Steps/SupplementaryInformation';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import BankDetails from 'components/Steps/BankDetails';
import Declaration from 'components/Steps/Declaration';
import Summary from 'components/Steps/Summary';

import BusinessClassificationSummary from 'components/Steps/Summaries/BusinessClassification';

import * as options from 'lib/dbMapping';

export const stepPath = '/step/[id]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'eligibility-criteria-details': EligibilityCriteriaDetails,
  'business-details': BusinessDetails,
  'your-details': YourDetails,
  'supplementary-information': SupplementaryInformation,
  'bank-details': BankDetails,
  declaration: Declaration,
  summary: Summary,
};

export const inputLabels = {
  eligibilityCriteria: {
    tradingInHackney: {
      label: 'Is your business based in and trading in Hackney?',
      validation: { required: true },
      adminValidation: true,
    },
    liableForRates: {
      label: 'Is your business liable for business rates?',
      validation: { required: true },
      adminValidation: true,
    },
    isBusinessClosed: {
      label: 'Is your business closed by law?',
      hint:
        'Please select Partly if your business is continuing to offer delivery and/or click-and-collect services (where items are pre-ordered and collected without entering the premises).',
      options: options.IS_BUSINESS_CLOSED,
      validation: { required: true },
      adminValidation: true,
    },
  },
  eligibilityCriteriaDetails: {
    businessSizeId: {
      label: 'What is the size of your business?',
      children: <BusinessClassificationSummary />,
      options: options.BUSINESS_SIZE,
      validation: { required: true },
      adminValidation: true,
    },
    howManyEmployees: {
      label: 'How many employees does your business have?',
      hint: 'Full time equivalents',
      inputClassName: 'govuk-input--width-10',
      inputMode: 'numeric',
      validation: {
        required: true,
        pattern: {
          value: /^[0-9]*$/,
        },
      },
    },
    typeOfBusinessId: {
      label: 'Type of business',
      options: options.TYPE_OF_BUSINESS,
      hint: (
        <>
          Please note your business must be open to the public - businesses
          which supply these sectors will not be eligible.For further guidance
          on which category best suits your business activity please use the
          following{' '}
          <a
            href="https://www.gov.uk/guidance/new-national-restrictions-from-5-november?priority-taxon=09944b84-02ba-4742-a696-9e562fc9b29d#businesses-and-venues"
            target="_blank"
            rel="noopener"
          >
            link
          </a>
          .
        </>
      ),
      validation: {
        required: true,
        validate: (value) => value !== '',
      },
      adminValidation: true,
    },
    tradingOn220320: {
      label: 'Was your business open for trading on the 22nd March 2020?',
      hint:
        'Businesses that believe they are eligible for the Local Restrictions Support Grant (Sector) must have been open and trading on the 22nd March 2020 (prior to being ordered to close by government guidance)',
      validation: { required: true },
      adminValidation: true,
    },
    tradingOn161020: {
      label: 'Was your business open for trading on the 16th October 2020?',
      hint:
        'Businesses that believe they are eligible for the Local Restrictions Support Grant (Open) must have been open and trading on the 16th October 2020',
      validation: { required: true },
      adminValidation: true,
    },
    tradingOn041120: {
      label: 'Was your business open for trading on the 4th November 2020?',
      hint:
        'Businesses that believe they are eligible for the Local Restrictions Support Grant (for closed businesses) must have been open and trading on the 4th November 2020 (prior to being ordered to close by government guidance)',
      validation: { required: true },
      adminValidation: true,
    },
    servedLegalNotices: {
      label:
        'Is your business in administration, insolvent or in receipt of a striking off notice?',
      validation: { required: true },
      adminValidation: true,
    },
  },
  contact: {
    firstName: {
      label: 'First Name:',
      validation: {
        required: 'First Name is required',
      },
      adminValidation: true,
    },
    lastName: {
      label: 'Last Name:',
      validation: {
        required: 'Last Name is required',
      },
      adminValidation: true,
    },
    emailAddress: {
      label: 'Email Address:',
      validation: {
        required: 'Email Address is required',
      },
      type: 'email',
    },
    telephoneNumber: {
      label: 'Contact Telephone Number:',
      type: 'tel',
      validation: {
        pattern: {
          value: /^[0-9]*$/,
          message: 'Telephone Number must be a number',
        },
      },
    },
    address: { label: 'Applicant Address:' },
    dateOfBirth: {
      label: 'Date of Birth (Required for Sole Traders):',
      validation: {
        validate: {
          valid: (value) =>
            isValid(new Date(value)) || 'Must be a is valid Date',
          past: (value) => isPast(new Date(value)) || 'Must be a past Date',
        },
      },
    },
  },
  business: {
    businessName: {
      label: 'Business Trading Name:',
      validation: {
        required: 'Business Name is required',
      },
      adminValidation: true,
    },
    registeredName: {
      label:
        'Business Registered Name (if different from Business Trading Name):',
    },
    businessRatesAccountNumber: {
      label: 'Business Rates Account Number:',
      hint: (
        <>
          A nine digit number starting with a 6 - this is shown on your business
          rates bill. Please note you must have a business rates account to be
          eligible for this grant. If you do not have an account number, but
          believe you’re still eligible, please contact{' '}
          <a href="mailto://grant.admin@hackney.gov.uk">
            grant.admin@hackney.gov.uk
          </a>{' '}
          with a brief summary of your circumstances (e.g. name, property
          address, reason for not holding an account number).
        </>
      ),
      validation: {
        required: true,
        pattern: {
          value: /^6(\d{8}|\d{7}x)$/i,
        },
      },
    },
    businessRatesPayer: {
      label: 'Name of Business Rates Payer:',
      hint: 'As shown on your business rates bill.',
      validation: {
        required: true,
      },
    },
    businessTradingAddress: {
      label: 'Business Registered Trading Address:',
    },
    businessAddress: {
      label: 'Business Premises Address in the London Borough of Hackney:',
    },
    businessAnnualRent: {
      label: 'Business Premises Annual Rent (or Mortgage if applicable):',
      type: 'number',
      validation: { min: 0 },
    },
    businessWebsite: {
      label: 'Business Website Address (if applicable):',
    },
  },
  businessBankAccount: {
    bankName: {
      label: 'Bank Name:',
      validation: { required: 'Bank Name is required' },
    },
    accountHolder: {
      label: 'Account Holder Name:',
      validation: { required: 'Account Holder Name is required' },
      adminValidation: true,
    },
    accountNumber: {
      inputClassName: 'govuk-input--width-10',
      label: 'Account Number:',
      inputMode: 'numeric',
      validation: {
        required: 'Account Number is required',
        pattern: {
          value: /^[0-9]{8}$/,
          message: 'Account Number must be a 8 digit number',
        },
      },
      adminValidation: true,
    },
    accountSortcode: {
      inputClassName: 'govuk-input--width-5',
      label: 'Sort Code:',
      inputMode: 'numeric',
      validation: {
        required: 'Sort Code is required',
        pattern: {
          value: /^[0-9]{6}$/,
          message: 'Sort Code must be a 6 digit number',
        },
      },
      adminValidation: true,
    },
  },
  declaration: {
    name: {
      label: 'Full Name of person making this declaration:',
      validation: { required: true },
    },
    contactTypeId: {
      label: 'Role/position in organisation:',
      options: options.CONTACT_TYPE,
      validation: {
        required: 'Role/position in organisation is required',
        validate: (value) => value !== '',
      },
    },
    authoriseOnBehalf: {
      label:
        'I confirm that I am authorised to submit this form on behalf of the business',
      validation: { required: true },
    },
    businessMeetsCriteria: {
      label:
        'I declare that the business meets the criteria for the grant I am applying for and that the information I have provided is complete and accurate',
      validation: { required: true },
    },
    businessClosedByLaw: {
      label:
        'I confirm that the business has closed by law due to the Government lockdown restrictions',
      validation: { required: true },
    },
    businessIntendsReopen: {
      label:
        'I confirm that my business intends to re-open when the national lockdown restrictions end',
      validation: { required: true },
    },
    businessIWillInform: {
      label:
        'I confirm that I will inform Hackney Council if the business no longer meets the eligibility criteria ',
      validation: { required: true },
    },
    businessNotExceed: {
      label:
        'I confirm that, including receipt of this grant, the business will not exceed the State Aid limits',
      validation: { required: true },
    },
    businessNotUndertaking: {
      label:
        'I confirm that my business is not an undertaking in difficulty (within the meaning of Article 2 (18) of the General Block Exemption Regulation) on 31 December 2019',
      validation: { required: true },
    },
    businessNotRatePayer: {
      label:
        'I understand that if the recipient of the grant was not the ratepayer on the eligible day, or is paid in error it will be recoverable from the recipient.',
      validation: { required: true },
    },
    businessPermitData: {
      label:
        'If required I permit the data provided in this form to be used to determine my eligibility for the  Local Restrictions Support Grant (Open).',
      validation: { required: true },
    },
    businessShareWithBEIS: {
      label:
        'I confirm that I am happy for my data to be shared with BEIS for research and evaluation purposes',
      validation: { required: true },
    },
    businessHappyContacted: {
      label:
        'I confirm that I am happy to be contacted by Hackney Council in the future for details of new business funding opportunities',
      validation: { required: true },
    },
  },
  supplementaryInformation: {
    bankStatement: {
      label: 'Bank Statement:',
      hint:
        'Please provide your November 2020 business bank statement which must correspond with the bank account details provided in this application form',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
    RatesBill: {
      label: 'Business Rates Bill:',
      hint: 'Please provide a copy of your latest business rates bill',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
  },
};

export const getInputProps = (
  form,
  name,
  { register, control } = {},
  errors
) => {
  // filtering out adminValidation
  // eslint-disable-next-line no-unused-vars
  const { validation, adminValidation, ...props } =
    inputLabels[form][name] || {};
  return {
    name: `${form}.${name}`,
    ...props,
    register: validation && register ? register(validation) : register,
    control: control,
    rules: control && validation,
    error: errors && errors[form] && errors[form][name],
  };
};

export const hasAdminValidation = (form, name) =>
  inputLabels[form][name] && inputLabels[form][name].adminValidation;

export const stepKeys = Object.keys(steps);
