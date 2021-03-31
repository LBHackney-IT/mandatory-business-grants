ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_01_04_21 BOOLEAN;

ALTER TABLE application_assessment ADD COLUMN restart_grant_amount DECIMAL(12,2) DEFAULT 0;

ALTER TABLE application_assessment ADD COLUMN restart_grant_payment_exported BOOLEAN DEFAULT FALSE;
