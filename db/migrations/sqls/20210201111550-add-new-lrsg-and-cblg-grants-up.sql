ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_04_01_21 BOOLEAN;

ALTER TABLE application_assessment ADD COLUMN lrsg_closed_5_jan_amount DECIMAL(12,2) DEFAULT 0;
ALTER TABLE application_assessment ADD COLUMN cblg_amount DECIMAL(12,2) DEFAULT 0;

ALTER TABLE application_assessment ADD COLUMN lrsg_closed_5_jan_payment_exported BOOLEAN DEFAULT FALSE;
ALTER TABLE application_assessment ADD COLUMN cblg_payment_exported BOOLEAN DEFAULT FALSE;
