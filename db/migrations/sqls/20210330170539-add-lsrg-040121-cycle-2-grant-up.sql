ALTER TABLE eligibility_criteria_details ADD COLUMN trading_on_04_01_21_cycle_2 BOOLEAN;

ALTER TABLE application_assessment ADD COLUMN lrsg_closed_5_jan_cycle_2_amount DECIMAL(12,2) DEFAULT 0;

ALTER TABLE application_assessment ADD COLUMN lrsg_closed_5_jan_cycle_2_exported BOOLEAN DEFAULT FALSE;
