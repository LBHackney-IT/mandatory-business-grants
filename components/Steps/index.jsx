import isValid from 'date-fns/isValid';
import isPast from 'date-fns/isPast';

import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import EligibilityCriteriaDetails from 'components/Steps/EligibilityCriteriaDetails';
import SupplementaryInformation from 'components/Steps/SupplementaryInformation';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import BusinessTurnover from 'components/Steps/BusinessTurnover';
import PropertyCost from 'components/Steps/PropertyCost';
import BankDetails from 'components/Steps/BankDetails';
import Declaration from 'components/Steps/Declaration';
import Summary from 'components/Steps/Summary';

import BusinessClassificationSummary from 'components/Steps/Summaries/BusinessClassification';
import DeclarationSummary from 'components/Steps/Summaries/Declaration';

import * as options from 'lib/dbMapping';

export const stepPath = '/step/[id]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'eligibility-criteria-details': EligibilityCriteriaDetails,
  'business-details': BusinessDetails,
  'your-details': YourDetails,
  'business-turnover': BusinessTurnover,
  'property-costs': PropertyCost,
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
    contactTypeId: {
      label: 'Role/position in organisation:',
      options: options.CONTACT_TYPE,
      validation: {
        required: 'Role/position in organisation is required',
        validate: (value) => value !== '',
      },
    },
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
    address: { label: 'Address:' },
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
  turnover: {
    turnover: {
      label: 'Business turnover March to May (inclusive) 2020:',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 },
    },
    year1819: {
      label: 'Financial Year 18/19',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 },
    },
    year1920: {
      label: 'Financial Year 19/20',
      hint:
        'Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 },
    },
  },
  fixedPropertyCosts: {
    year2018To2019: {
      label: 'Financial Year 18/19',
      hint:
        'Fields require numeric values e.g 10000 for £10,000. Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 },
    },
    year2019To2020: {
      label: 'Financial Year 19/20',
      hint:
        'Fields require numeric values e.g 10000 for £10,000. Information to be verifiable with supplementary information as required below.',
      type: 'number',
      validation: { required: "It's required", min: 0 },
      adminValidation: true,
    },
    itemsIncluded: {
      label: 'Items included:',
      hint:
        'A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader).',
      validation: { required: 'Items included is required' },
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
    stateAidOptionId: {
      label: 'State Aid',
      hint:
        '(If relevant to this application, please select whether you the Covid-19 Framework Scheme or the State Aid De Minimus Rule applies.)',
      children: <DeclarationSummary />,
      isRadiosInline: false,
      options: options.STATE_AID_OPTION,
      validation: { required: "It's required" },
    },
    dateOfAid: {
      label: 'Date of aid',
      validation: {
        required: 'Date of aid is required',
        validate: {
          valid: (value) =>
            isValid(new Date(value)) || 'Must be a is valid Date',
          past: (value) => isPast(new Date(value)) || 'Must be a past Date',
        },
      },
    },
    stateAidReceived: {
      label:
        'I/we have received the following value of State Aid under above rule',
      type: 'number',
      validation: { required: "It's required" },
    },
    organisationProvidingAid: {
      label: 'Organisation/Body providing aid',
      validation: { required: 'Organisation/Body providing aid' },
    },
    permittedToAcceptStateAidGrant: {
      label:
        'I/we declare that I/we are permitted to accept the discretionary grant funding and does not exceed the cap under the above relevant state aid rule',
      validation: {
        required: 'You need to agree.',
        validate: (value) => value === 'Yes' || 'You need to agree.',
      },
    },
    readUnderstoodDeclaration: {
      label: 'Tick to confirm you have read and understood the declaration',
      validation: { required: 'You need to confirm.' },
    },
  },
  supplementaryInformation: {
    businessAccounts: {
      label: 'Business Accounts:',
      hint:
        'Please provide a company of the business accounts for the financial year 2018/19 (or your HMRC self assessment tax return for the financial year 2018/19). If not available please provide what is available',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
    fixedPropertyCosts: {
      label: 'Fixed Property costs:',
      hint:
        'Please provide evidence of your ongoing fixed property costs (such as the lease, licence, rental agreement or mortgage statement for the business premises)',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
    fallInIncome: {
      label: 'Fall in income:',
      hint:
        'Fall in income: please provide financial evidence showing the fall in income experienced by your business as a result of Covid-19 (such as; up to date business management accounts for the last 12 months showing profit and loss, turnover, cashflow and balance sheet, bank statements over the past 6 months, a brief written statement (no more than one side of A4) setting out the financial impact that Covid-19 has had on your business and why, and how this grant will support your business to trade beyond the current crisis)',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
    identity: {
      label: 'Identity',
      hint:
        'Please provide a form of photo identification such as a passport or driving licence',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
    payrollInformation: {
      label: 'Payroll Information',
      hint:
        'If available please provide your business payroll information for the last 6 months showing the number of people employed and paid by the business',
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
