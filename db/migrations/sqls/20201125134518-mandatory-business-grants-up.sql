/* Replace with your SQL commands */
/*These have been left because regardless the content in the form these will still be needed*/
/*drop table application_assessment;*/
/*drop table application_history;*/
/*drop table application_state;*/
/*drop table document_upload;*/
/*drop table if exists contact_type cascade;*/
/*drop table if exists business_size cascade;*/

drop table if exists business cascade;
drop table if exists business_address cascade;
drop table if exists business_bank_account cascade;
drop table if exists business_structure cascade;
drop table if exists business_type cascade;
drop table if exists contact cascade;
drop table if exists contact_address cascade;
drop table if exists declaration cascade;
drop table if exists eligibility_criteria cascade;
drop table if exists grant_application cascade;
drop table if exists rateable_limit_answer cascade;
drop table if exists site_description cascade;
drop table if exists state_aid_option cascade;

/*Just the basic data layout with minimal constraints*/
/*
note that the types in the below tables may change rapidly
as the structure becomes more apparent
*/
create table declaration (
  id serial primary key,
  grant_application_id integer,
  name text,
  contact_type_id integer references contact_type(id),
  authorise_on_behalf boolean,
  business_meets_criteria boolean,
  business_closed_by_law boolean,
  business_intends_reopen boolean,
  business_i_will_inform boolean,
  business_not_exceed boolean,
  business_not_undertaking boolean,
  business_not_rate_payer boolean,
  business_permit_data boolean,
  business_share_with_beis boolean,
  business_happy_contacted boolean
);

create table business_bank_account (
  id serial primary key,
  grant_application_id integer,
  bank_name text,
  account_holder text,
  account_number text,
  account_sortcode text
);

create table fixed_property_cost (
  id serial primary key,
  grant_application_id integer,
  items_included text,
  year_2019_to_2020 text,
  year_2018_to_2019 text
);

create table turnover (
  id serial primary key,
  grant_application_id integer,
  items_included text,
  year_19_20 text,
  year_18_19 text,
  turnover text
);

create table business (
  id serial primary key,
  grant_application_id integer,
  business_name text,
  registered_name text,
  business_identify_type text,
  business_identify_number text,
  business_rates_account_number integer,
  business_rates_payer text,
  business_annual_rent integer,
  business_website text
);

create table business_address (
  id serial primary key,
  grant_application_id integer,
  first_line text,
  second_line text,
  third_line text,
  ward text,
  uprn integer,
  postcode text
);
  
/*same form as business_address*/
create table business_trading_address (
  id serial primary key,
  grant_application_id integer,
  first_line text,
  second_line text,
  third_line text,
  ward text,
  uprn integer,
  postcode text
);

create table contact (
  id serial primary key,
  grant_application_id integer,
  first_name text,
  last_name text,
  email_address text,
  telephone_number text,
  date_of_birth text
);

create table contact_address (
  id serial primary key,
  grant_application_id integer,
  first_line text,
  second_line text,
  third_line text,
  ward text,
  uprn integer,
  postcode text
);

create table eligibility_criteria (
  id serial primary key,
  grant_application_id integer,
  trading_in_hackney boolean,
  liable_for_rates boolean,
  is_business_closed boolean
);

create table eligibility_criteria_details (
  id serial primary key,
  grant_application_id integer,
  business_size_id integer,
  how_many_employees integer,
  trading_on_22_03_20 boolean,
  trading_on_16_10_20 boolean,
  trading_on_04_11_20 boolean,
  served_legal_notices boolean,
  business_category text,
  business_sub_category text,
  business_custom_category text
);
