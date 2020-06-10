import EligibilityCriteria from 'components/Steps/EligibilityCriteria';
import SupplementaryInformation from 'components/Steps/SupplementaryInformation';
import YourDetails from 'components/Steps/YourDetails';
import BusinessDetails from 'components/Steps/BusinessDetails';
import BusinessTurnover from 'components/Steps/BusinessTurnover';
import PropertyCost from 'components/Steps/PropertyCost';
import BankDetails from 'components/Steps/BankDetails';
import Declaration from 'components/Steps/Declaration';
import Summary from 'components/Steps/Summary';

import TypeOfBusinessSummary from 'components/Steps/TypeOfBusinessSummary';

export const stepPath = '/step/[id]';

export const steps = {
  'eligibility-criteria': EligibilityCriteria,
  'your-details': YourDetails,
  'business-details': BusinessDetails,
  'business-turnover': BusinessTurnover,
  'property-costs': PropertyCost,
  'supplementary-information': SupplementaryInformation,
  'bank-details': BankDetails,
  declaration: Declaration,
  summary: Summary
};

// options references in db/seeds.sql

import * as options from 'lib/dbMapping';

export const inputLabels = {
  eligibilityCriteria: {
    tradingInHackney: {
      label: 'Is your business based in and trading in Hackney?'
    },
    businessSizeId: {
      label: 'Is your business classed as either a micro or small business?',
      hint:
        'Micro and small businesses only as defined in the Companies Act 2006. To be defined as a small business they must have at least two of the following; not more than 50 employees, a turnover of not more than £10.2 million and a balance sheet total of not more than £5.1m. To be defined as a microbusinesses they must have at least two of the following; not more than 10 employees, a turnover of not more than £632,000, and a balance sheet total of not more than £316,000.',
      options: options.BUSINESS_SIZE
    },
    tradingOn20200311: {
      label: 'Was your business trading on the 11th March 2020?'
    },
    typeOfBusinessId: {
      label: 'Type of business',
      options: options.TYPE_OF_BUSINESS,
      children: <TypeOfBusinessSummary />
    },
    servedLegalNotices: {
      label:
        'Is your business in administration, insolvent or in receipt of a striking off notice?'
    },
    receivedOtherGrants: {
      label:
        'Has your business either received or is eligible for either a Small Business Grant, the Retail, Hospitality and Leisure Grant, The Fisheries Response Fund, Domestic Seafood Supply Scheme (DSSS), The Zoos Support Fund, or The Dairy Hardship Fund.',
      hint:
        'Businesses must not be eligible for the existing Small Business Grant, the Retail, Hospitality and Leisure Grant, The Fisheries Response Fund, Domestic Seafood Supply Scheme (DSSS), The Zoos Support Fund, or The Dairy Hardship Fund to be considered for this grant'
    },
    hasFixedPropertyCost: {
      label:
        'Does your business have fixed property cost of £60,000 per year or below?',
      hint:
        'A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader) that is at least 30% of the annual business turnover.'
    },
    significantIncomeFall: {
      label:
        'Has your business experienced a SIGNIFICANT fall in income as a result of Covid-19?',
      hint:
        'A ‘significant fall in income’ is defined as a fall in income of at least a 40% reduction in business turnover from March 2020 onwards compared to the previous 3 months.'
    },
    rateableLimitAnswerId: {
      label:
        'If you have an individual business rates account does your premises have a rateable value of £60,000 or less?',
      options: options.RETEABLE_LIMIT_ANSWER
    }
  },
  contact: {
    contactTypeId: {
      label: 'Role/position in organisation:',
      options: options.CONTACT_TYPE
    },
    firstName: { label: 'First Name:' },
    lastName: { label: 'Last Name:' },
    emailAddress: { label: 'Email Address:' },
    telephoneNumber: { label: 'Telephone Number:' },
    address: { label: 'Address:' }
  },
  business: {
    businessName: {
      label: 'Business name:',
      hint: '(trading name, charity name etc)'
    },
    registeredName: { label: 'Registered Name (if applicable):' },
    businessDescription: {
      label: 'Business activity:',
      hint: 'What is the main business activity carried out'
    },
    businessAddress: { label: 'Business Premises Address:' },
    siteDescriptionId: {
      label: 'Business site description:',
      hint:
        '(e.g shared office, shared workspace, individual shop, individual office, market stall etc)',
      options: options.SITE_DESCRIPTION
    },
    companyNumber: { label: 'Company number (if applicable) ' },
    companyStructureId: {
      label: 'Business Structure:',
      options: options.COMPANY_STRUCTURE
    },
    ratesAccountNumber: {
      label: 'Business Rates Account Number (if applicable):'
    },
    registeredCharity: {
      label: 'Registered Charity Number (if applicable):',
      type: 'number'
    },
    councilRentAccountNumber: {
      label: 'Council premises rent account number (if applicable):',
      type: 'number'
    },
    councilTaxNumber: {
      label: 'Council tax number (if applicable):',
      hint: '(eg if you are a B&B)',
      type: 'number'
    },
    fullTimeEmployees: { label: 'Number of Employees:', type: 'number' },
    percentageFallInIncome: {
      label: 'Percentage fall in income due to Covid-19:',
      type: 'number'
    },
    rateableValue: {
      label: 'Business premises rateable value (if applicable):'
    }
  },
  turnover: {
    turnover: {
      label: 'Business turnover March to May (inclusive) 2020:',
      type: 'number'
    },
    year1819: { label: 'Financial Year 18/19', type: 'number' },
    year1920: { label: 'Financial Year 19/20', type: 'number' }
  },
  fixedPropertyCosts: {
    year2018To2019: { label: 'Financial Year 18/19', type: 'number' },
    year2019To2020: { label: 'Financial Year 19/20', type: 'number' },
    itemsIncluded: {
      label: 'Items included:',
      hint:
        'A ‘fixed property related cost’ is defined as an ongoing fixed business premises rent cost, business premises licence cost, business premises mortgage cost, market pitch fee (in the case of a market trader), or business storage fee (in the case of a market trader) that is at least 30% of the annual business turnover.'
    }
  },
  businessBankAccount: {
    bankName: { label: 'Bank Name:' },
    accountHolder: { label: 'Account Holder Name:' },
    accountNumber: { label: 'Account Number:', type: 'number' },
    accountSortcode: { label: 'Sort Code:' }
  },
  declaration: {
    stateAidReceived: {
      label:
        'I/we have received the following value of State Aid under above rule',
      type: 'number'
    },
    stateAidCapNotExceeded: {
      label:
        'I/we confirm that our state aid fund/grant does not exceed the cap under above rule'
    },
    permittedToAcceptStateAidGrant: {
      label:
        'I/we declare that i/we are permitted to accept the discretionary grant funding under the relevant state aid rule'
    },
    readUnderstoodDeclaration: {
      label: 'Tick to confirm you have read and understood the declaration'
    }
  },
  supplementaryInformation: {
    businessAccounts: {
      label: 'Business Accounts:',
      hint:
        'Please provide a company of the business accounts for the financial year 2018/19 (or your HMRC self assessment tax return for the financial year 2018/19). If not available please provide what is available'
    },
    fixedPropertyCosts: {
      label: 'Fixed Property costs:',
      hint:
        'Please provide evidence of your ongoing fixed property costs (such as the lease, licence, rental agreement or mortgage statement for the business premises)'
    },
    fallInIncome: {
      label: 'Fall in income:',
      hint:
        ' Please provide financial evidence showing the fall in income experienced by your business as a result of Covid-19 (such as; up to date business management accounts for the last 12 months showing profit and loss, turnover, cashflow and balance sheet. Bank statements over the past 6 months)'
    },
    identity: {
      label: 'Identity',
      hint:
        'Please provide a form of photo identification such as a passport or driving licence'
    },
    payrollInformation: {
      label: 'Payroll Information',
      hint:
        'If available please provide your business payroll information for the last 6 months showing the number of people employed and paid by the business'
    }
  }
};

export const getInputProps = (form, name) => ({
  name: `${form}.${name}`,
  ...inputLabels[form][name]
});

export const stepKeys = Object.keys(steps);
