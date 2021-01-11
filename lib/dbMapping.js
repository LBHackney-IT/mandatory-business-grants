// options references in db/seeds.sql

export const LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT = [
  '0',
  '1334.00',
  '2000.00',
  '3000.00',
];
export const LRSG_SECTOR_AMOUNT = ['0', '190.57', '285.71', '428.57'];
export const LRSG_OPEN_AMOUNT = ['0', '934.00', '1400.00', '2100.00'];
export const LRSG_CLOSED_TIER_2_AMOUNT = ['0', '1344.00', '2000.00', '3000.00'];
export const LRSG_CLOSED_TIER_3_AMOUNT = ['0', '1344.00', '2000.00', '3000.00'];
export const LRSG_CLOSED_TIER_4_AMOUNT = ['0', '1344.00', '2000.00', '3000.00'];
export const CSP_AMOUNT = ['0', '1000.00'];

export const BUSINESS_SIZE = ['Micro', 'Small', 'Medium', 'Large'];
export const VALID_BUSINESS_SIZE = ['Micro', 'Small'];

export const TYPE_OF_BUSINESS = [
  'Business in shared offices or workspaces without business rates assessment',
  'Business in RHL sector with a rateable value of between £51,000-£60,000 ',
  'Business whose income is directly related to RHL sector',
  'Regular market trader with fixed building costs',
  'Bed & Breakfast who pay Council Tax',
  'Charity properties who occupy a commercial property with a rateable value of £15,000 or less',
  'Ofsted registered nurseries (not within a domestic premises)',
];

export const TYPE_IDENTIFIER_NUMBER = [
  'Company Number',
  'VAT Registration Number',
  'Self-Assessment/Partnership Number',
  'National Insurance Number',
  'Unique Taxpayer Reference',
  'Registered Charity Number',
];

export const RATEABLE_LIMIT_ANSWERS = ['Yes', 'No', 'Not Applicable'];

export const CONTACT_TYPE = [
  'Agent (Authorised to act)',
  'Owner (Sole Trader)',
  'Partner / Employee (Acting for)',
  'PSC of Registered Company (Person with significant control)',
  'Trustee (Charity)',
  'Other',
];

export const COMPANY_STRUCTURE = [
  'Charity',
  'Partnership',
  'Registered company',
  'Social enterprise',
  'Sole trader',
];

export const SITE_DESCRIPTION = [
  'Individual Office',
  'Individual Shop',
  'Market Stall',
  'Office in a Shared Workspace',
  'B&B',
  'Nursery',
  'Other',
];

export const STATE_AID_OPTION = [
  'Not Applicable',
  'Covid 19 Temporary Framework Scheme',
  'State Aid De Minimis Rule',
];

export const STATE_AID_OPTION_WITH_MORE_Q = [
  'Covid 19 Temporary Framework Scheme',
  'State Aid De Minimis Rule',
];

export const APPLICATION_STATE = [
  'Unprocessed',
  'Pre-processed',
  'Pre-processed - Review',
  'Processed - Approved',
  'Processed - Rejected',
  'NFI',
  'Refer to Manager',
  'Closed - Duplicate',
  'Exported for Payment',
  'Declined - Test',
  'Processed - Check Bank Details',
];

export const BUSINESS_CATEGORIES = {
  Retail: [
    'Clothing stores and tailors',
    'Homeware stores',
    'Tobacco and vape shops',
    'Electronic goods and mobile phone shops',
    'Markets (Non-Essential)',
    'Car and other vehicle showrooms',
    'Car washes',
    'Auction houses',
    'Other Non-Essential Retail',
  ],
  Hospitality: ['Restaurants', 'Pubs', 'Bars', 'Cafes', 'Other Hospitality'],
  'Holiday Accommodation': [
    'Hotels',
    'Hostels',
    'Bed and breakfast accommodation',
    'Holiday apartments/ home/ cottages/ bungalows',
    'Campsites',
    'Caravan parks',
    'Boarding houses',
    'Canal boats',
    'Other Holiday Accommodation',
  ],
  'Personal Care Facilities': [
    'Hair, Beauty, Nail Salon',
    'Tattoo Parlours',
    'Spas',
    'Massage Centres',
    'Body piercing and skin services',
    'Tanning Salons',
    'Other Personal Care Facilities',
  ],
  'Entertainment and Tourism': [
    'Nightclubs',
    'Bingo halls',
    'Casinos',
    'Betting shops',
    'Amusement arcades',
    'Bowling alleys',
    'Indoor games/ recreation/  entertainment venues',
    'Sexual entertainment venues / hostess bars',
    'Cinemas',
    'Theatres',
    'Concert halls/ Music Venues',
    'Museums and galleries',
    'Conference centres and exhibition halls',
    'Other Entertainment and Tourism',
  ],
  Leisure: [
    'Skating rinks',
    'Gyms',
    'Dance / fitness studios',
    'Sports courts',
    'Swimming pools',
    'Golf courses ',
    'Indoor playgrounds or play areas',
    'Other Leisure',
  ],
};

export const BUSINESS_SUB_WITH_FREETEXT = [
  'Other Non-Essential Retail',
  'Other Hospitality',
  'Other Holiday Accommodation',
  'Other Personal Care Facilities',
  'Other Entertainment and Tourism',
  'Other Leisure',
];
