INSERT INTO application_state(id, description)
VALUES(1, 'Unprocessed')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(2, 'Pre-processing')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(3, 'Pre-processing - Awaiting info')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(4, 'Pre-processed')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(5, 'Pre-processing - Rejected')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(6, 'Processing')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(7, 'Panel Approved - Waiting for Bank Statement')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(8, 'Refer to Manager')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(9, 'Processing - Awaiting info')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(10, 'Processed - Panel Review')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(11, 'Processed - Rejected')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(12, 'Panel Approved')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(13, 'Panel Rejected')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state (id, description)
VALUES(14, 'Closed - Duplicate')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state (id, description)
VALUES(15, 'Closed - Resubmitting')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(16, 'Exported for Payment')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(17, 'Declined - Test')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(18, 'Panel Approved - Tier 2')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(19, 'Panel - Awaiting info')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(20, 'NFI Check')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
