ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_01_12_20_open BOOLEAN;

ALTER TABLE application_assessment ADD COLUMN lrsg_open_version_2_amount DECIMAL(12,2) DEFAULT 0;

ALTER TABLE application_assessment ADD COLUMN lrsg_open_version_2_payment_exported BOOLEAN DEFAULT FALSE;
