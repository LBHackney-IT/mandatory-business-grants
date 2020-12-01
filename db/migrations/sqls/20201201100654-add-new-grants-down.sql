alter table application_assessment add column grant_amount_awarded int default 0;
alter table application_assessment drop column lrsg_closed_businesses_amount;
alter table application_assessment drop column lrsg_sector;
alter table application_assessment drop column lrsg_open;
