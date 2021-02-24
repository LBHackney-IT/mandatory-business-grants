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
  'bank-details': BankDetails,
  'supplementary-information': SupplementaryInformation,
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
      hint:
        'Please note if you receive any form of business rates relief you are still classed as being liable for business rates.',
    },
  },
  eligibilityCriteriaDetails: {
    businessSizeId: {
      label: 'What is the size of your business?',
      children: <BusinessClassificationSummary />,
      options: options.BUSINESS_SIZE,
      validation: { required: true },
    },
    howManyEmployees: {
      label: 'How many employees does your business have?',
      hint: 'Full time equivalents',
      inputClassName: 'govuk-input--width-10',
      type: 'number',
      inputMode: 'numeric',
      validation: {
        required: true,
        pattern: {
          value: /^[0-9]+$/,
        },
      },
    },
    businessCategory: {
      label:
        'Please select the category which best describes your business activity',
      options: Object.keys(options.BUSINESS_CATEGORIES),
      hint: (
        <>
          Please note your business must normally be open to the public -
          businesses which supply these sectors will not be eligible. See{' '}
          <a
            href="https://www.gov.uk/guidance/new-national-restrictions-from-5-november?priority-taxon=09944b84-02ba-4742-a696-9e562fc9b29d#businesses-and-venues"
            target="_blank"
            rel="noopener"
          >
            guidance on which category best suits your business activity
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
    businessSubCategory: {
      label: 'Please select the sub-category:',
      validation: {
        required: true,
        validate: (value) => value !== '',
      },
    },
    businessCustomCategory: {
      label: 'Please provide a short description of your business activity:',
      validation: {
        required: true,
      },
    },
    tradingOn220320: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Sector)?
          <ul>
            <li>
              Business has been mandated to close by the government on 23rd
              March 2020 and has been unable to open since. Eligible businesses
              include: nightclubs, discos, dance halls, hostess bars and adult
              entertainment venues.
            </li>
            <li>
              Business was trading on the day before local restrictions came
              into effect (i.e. on 22nd March 2020).
            </li>
          </ul>
        </>
      ),
      validation: { required: true },
    },
    tradingOn161020: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Open), under Tier 2 restrictions in
          October 2020?
          <ul>
            <li>
              Business was able to remain open under local Tier 2 restrictions
              from 17 October 2020 to 4 November 2020 but whose trade was
              severely impacted by Tier 2 restrictions (e.g. the prevention of
              households from mixing indoors).
            </li>
            <li>
              Business was trading on the day before the first Tier 2 local
              restrictions came into effect (i.e. on 16th October 2020).
            </li>
          </ul>
        </>
      ),
      validation: { required: true },
    },
    tradingOn041120: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Closed) Addendum?
          <ul>
            <li>
              Business has been mandated to close by the Government under the
              national lockdown between the 5th November 2020 and 1st December
              2020. Eligible businesses include: non-essential retail, leisure,
              personal care, sports facilities, and hospitality.
            </li>
            <li>
              Business was trading on the day before local restrictions came
              into effect (i.e. on 4th November 2020).
            </li>
          </ul>
        </>
      ),
      hint:
        'Please note if your business was closed on the 4th November 2020 as a result of the Government COVID-19 restrictions but would otherwise have been open and trading then you are considered to have been trading on the 4th November 2020.',
      validation: { required: true },
    },
    tradingOn011220Open: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Open), under Tier 2 restrictions in
          December 2020?
          <ul>
            <li>
              Business was able to remain open under local Tier 2 restrictions
              from 2 December to 15 December but whose trade was severely
              impacted by Tier 2 restrictions (e.g. the prevention of households
              from mixing indoors).
            </li>
            <li>
              Business was trading on the day before Tier 2 local restrictions
              came into effect (i.e. on 1st December 2020).
            </li>
          </ul>
        </>
      ),
      hint:
        'Please note if your business was closed on the 1st December 2020 as a result of Government COVID-19 restrictions but would otherwise have been open and trading then you will be considered to have been trading on the 1st December 2020.',
      validation: { required: true },
    },
    tradingOn011220: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Closed), under Tier 2 restrictions in
          December 2020?
          <ul>
            <li>
              Business was required to close by the Government under Tier 2
              restrictions (a public house, bar or other business involving the
              sale of alcohol for consumption that does not serve table meals).
            </li>
            <li>
              Business was trading on the day before Tier 2 local restrictions
              came into effect (i.e. on 1st December 2020).
            </li>
          </ul>
        </>
      ),
      hint:
        'Please note if your business was closed on the 1st December 2020 as a result of Government COVID-19 restrictions but would otherwise have been open and trading then you will be considered to have been trading on the 1st December 2020.',
      validation: { required: true },
    },
    tradingOn151220: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Closed), under Tier 3 restrictions in
          December 2020?
          <ul>
            <li>
              Business was required to close by the Government under Tier 3
              restrictions; sectors required to close include hospitality,
              accommodation, indoor entertainment and tourism venues.
            </li>
            <li>
              Business was trading on the day before Tier 3 local restrictions
              into effect (i.e. on 15th December 2020).
            </li>
          </ul>
        </>
      ),
      hint:
        'Please note if your business was closed on the 15th December 2020 as a result of Government COVID-19 restrictions but would otherwise have been open and trading then you will be considered to have been trading on the 15th December 2020.',
      validation: { required: true },
    },
    // The label and key contain different dates, as the date changed in the copy after launch,
    // but we decided against a DB migration to make the column match.
    tradingOn191220: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Closed) Addendum: Tier 4?
          <ul>
            <li>
              Business was required to close by the Government under Tier 4
              restrictions, including non-essential retail, leisure, personal
              care, sports facilities, and hospitality.
            </li>
            <li>
              Business was trading on the day before Tier 4 local restrictions
              came into effect (i.e. on 18th December 2020).
            </li>
          </ul>
        </>
      ),
      hint:
        'Please note if your business was closed on the 18th December 2020 as a result of Government COVID-19 restrictions but would otherwise have been open and trading then you are considered to have been trading on the 18th December 2020.',
      validation: { required: true },
    },
    tradingOn040121: {
      label: (
        <>
          Does your business meet the following criteria for the Local
          Restrictions Support Grant (Closed) Addendum: 5 January onwards and
          Closed Businesses Lockdown Payment?
          <ul>
            <li>
              Business was required to close by the Government under the
              national lockdown which started on 5th January 2021, including
              non-essential retail, leisure, personal care, sports facilities,
              and hospitality. See{' '}
              <a
                href="https://www.gov.uk/government/publications/further-businesses-and-premises-to-close/closing-certain-businesses-and-venues-in-england"
                target="_blank"
                rel="noopener"
              >
                guidance on business closures in England
              </a>
              .
            </li>
            <li>
              Business was trading on the day before local restrictions came
              into effect (i.e on the 4th January 2021).
            </li>
          </ul>
        </>
      ),
      hint:
        'Please note if your business was closed on the 4th January 2021 as a result of Government COVID-19 restrictions but would otherwise have been open and trading then you are considered to have been trading on the 4th January 2021.',
      validation: { required: true },
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
    },
    lastName: {
      label: 'Last Name:',
      validation: {
        required: 'Last Name is required',
      },
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
        required: true,
        pattern: {
          value: /^[0-9]*$/,
          message: 'Telephone Number must be a number',
        },
      },
    },
    address: { label: 'Applicant Address:' },
    dateOfBirth: {
      label: 'Date of Birth (Only required for Sole Traders):',
      validation: {
        validate: {
          valid: (value) =>
            value && (isValid(new Date(value)) || 'Must be a valid Date'),
          past: (value) =>
            value && (isPast(new Date(value)) || 'Must be a past Date'),
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
    },
    registeredName: {
      label:
        'Business Registered Name (if different from Business Trading Name):',
    },
    businessIdentifyType: {
      label: 'Please supply one of the following Business Identifying Numbers:',
      hint:
        'Where available, please provide your Company Number as listed on Companies House. If you don’t have a Company Number, please provide another number from the list below.',
      options: options.TYPE_IDENTIFIER_NUMBER,
      validation: {
        required: true,
      },
    },
    businessIdentifyNumber: {
      validation: {
        required: true,
      },
    },
    businessIdentifyNumberCompanyNumber: {
      validation: {
        required: true,
        pattern: {
          value: /^[a-zA-Z0-9]{7,8}$/,
        },
      },
    },
    businessIdentifyNumberVAT: {
      type: 'number',
      hint:
        "Please enter your 9 digit number, without the 'GB' at the start, for example 123456789. You can find it on your VAT registration certificate.",
      validation: {
        required: true,
        pattern: {
          value: /^\d{9}$/,
        },
      },
    },
    businessIdentifyNumberNIN: {
      validation: {
        required: true,
        pattern: {
          value: /^[0-9a-z]{9}$/i,
        },
      },
    },
    businessIdentifyNumberUTR: {
      validation: {
        required: true,
        pattern: {
          value: /^(\d{10}|\d{9}K)$/i,
        },
      },
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
      label:
        'Business Premises Annual Rent (or Annual Mortgage Cost if applicable):',
      type: 'number',
      validation: { required: true, min: 0, validate: (value) => value > 0 },
    },
    businessWebsite: {
      label: 'Business Website (if applicable):',
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
        'I declare that the business meets the criteria for the grant/grants I am applying for and that the information I have provided is complete and accurate',
      validation: { required: true },
    },
    businessIntendsReopen: {
      label:
        'I confirm that my business intends to re-open, if it has not already done so (subject to Government guidance)',
      validation: { required: true },
    },
    businessIWillInform: {
      label: (
        <>
          I confirm that I will inform Hackney Council if:
          <ul>
            <li>
              my business no longer occupies the premises stated in this
              application form
            </li>
            <li>
              my business ceases trading permanently, or goes into
              administration, becomes insolvent, is in receipt of a striking off
              notice
            </li>
            <li>
              my business no longer meets any other grant eligibility criteria
            </li>
          </ul>
        </>
      ),
      validation: { required: true },
    },
    businessNotExceed: {
      label: (
        <>
          <p>
            Version 2, LRSG (Closed), LRSG (Closed) Addendum: Tier 4, and the
            Closed Business Lockdown Grant all count towards the total de
            minimis State aid you are permitted to receive over a 3 year period
            which is €200,000. If you have reached the de minimis threshold, you
            may still be eligible for funding under the{' '}
            <a
              href="https://ec.europa.eu/competition/state_aid/what_is_new/covid_19.html"
              target="_blank"
              rel="noopener"
            >
              COVID-19 Temporary Framework
            </a>
            . The limit for this framework is €800,000.
          </p>
          <p>
            I confirm that, including receipt of this grant, the business will
            not exceed the relevant State aid threshold
          </p>
        </>
      ),
      validation: { required: true },
    },
    businessNotUndertaking: {
      label: (
        <>
          I confirm that my business is not an{' '}
          <a
            href="https://www.gov.uk/guidance/innovation-apply-for-a-funding-award#undertakings-in-difficulty--eu-definition"
            target="_blank"
            rel="noopener"
          >
            undertaking in difficulty
          </a>{' '}
          (within the meaning of Article 2 (18) of the General Block Exemption
          Regulation) on 31 December 2019
        </>
      ),
      validation: { required: true },
    },
    businessNotRatePayer: {
      label:
        'I understand that if the recipient of the grant was not the ratepayer on the eligible day, or is paid in error it will be recoverable from the recipient',
      validation: { required: true },
    },
    businessPermitData: {
      label: (
        <>
          I permit the data provided in this form to be used to determine my
          eligibility and process my application for the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions-for-closed-businesses"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Closed) Addendum
          </a>
          , the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-open-businesses"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Open)
          </a>
          , the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-your-nightclub-dance-hall-or-adult-entertainment-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Sector)
          </a>
          , the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-open-businesses"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Open) Version 2
          </a>
          , the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-closed-businesses"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Closed)
          </a>
          , the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-closed-businesses"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Closed) Addendum: Tier 4
          </a>
          , the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions-for-closed-businesses"
            target="_blank"
            rel="noopener"
          >
            Local Restrictions Support Grant (Closed) Addendum: 5 January
            onwards
          </a>
          , and the{' '}
          <a
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-the-coronavirus-closed-businesses-lockdown-payment"
            target="_blank"
            rel="noopener"
          >
            Closed Business Lockdown Grant
          </a>
        </>
      ),
      validation: { required: true },
    },
    businessShareWithBEIS: {
      label: (
        <>
          I confirm that I am happy for my data to be shared with{' '}
          <a
            href="https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy"
            target="_blank"
            rel="noopener"
          >
            BEIS
          </a>{' '}
          for research and evaluation purposes
        </>
      ),
      validation: { required: true },
    },
    businessHappyContacted: {
      label:
        'I confirm that I am happy to be contacted by Hackney Council in the future for details of new business funding opportunities and in relation to other business initiatives',
    },
  },
  supplementaryInformation: {
    bankStatement: {
      label: 'Bank Statement:',
      hint:
        'Please provide your November 2020 business bank statement - this must correspond with the bank account details provided in this application form. If you do not have your November bank statement, please submit your most recent bank statement.',
      validation: {
        validate: (value) => value.length > 0 || 'Document required',
      },
    },
    ratesBill: {
      label: 'Business Rates Bill:',
      hint:
        'Please provide a copy of your latest business rates bill. If you do not have a copy of this bill you may still submit your grant application, but please note that processing may take longer.',
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
