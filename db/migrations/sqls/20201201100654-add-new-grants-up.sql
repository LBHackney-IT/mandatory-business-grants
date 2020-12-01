alter table application_assessment drop column grant_amount_awarded;
alter table application_assessment add column lrsg_closed_businesses_amount decimal(12,2) default 0;
alter table application_assessment add column lrsg_sector_amount decimal(12,2) default 0;
alter table application_assessment add column lrsg_open_amount decimal(12,2) default 0;
