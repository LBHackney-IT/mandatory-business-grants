ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_30_11_20 BOOLEAN;
ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_01_12_20 BOOLEAN;
ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_15_12_20 BOOLEAN;
ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_19_12_20 BOOLEAN;

ALTER TABLE application_assessment ADD COLUMN csp_amount DECIMAL(12,2) DEFAULT 0;
ALTER TABLE application_assessment ADD COLUMN lrsg_closed_tier_2_amount DECIMAL(12,2) DEFAULT 0;
ALTER TABLE application_assessment ADD COLUMN lrsg_closed_tier_3_amount DECIMAL(12,2) DEFAULT 0;
ALTER TABLE application_assessment ADD COLUMN lrsg_closed_tier_4_amount DECIMAL(12,2) DEFAULT 0;

ALTER TABLE application_assessment ADD COLUMN csp_payment_exported BOOLEAN DEFAULT FALSE;
ALTER TABLE application_assessment ADD COLUMN lrsg_closed_tier_2_payment_exported BOOLEAN DEFAULT FALSE;
ALTER TABLE application_assessment ADD COLUMN lrsg_closed_tier_3_payment_exported BOOLEAN DEFAULT FALSE;
ALTER TABLE application_assessment ADD COLUMN lrsg_closed_tier_4_payment_exported BOOLEAN DEFAULT FALSE;
