DELETE FROM application_state WHERE id > 10;

INSERT INTO application_state(id, description)
VALUES(1, 'Unprocessed')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(2, 'Pre-processed')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(3, 'Pre-processed - Review')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(4, 'Processed - Approved')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(5, 'Processed - Rejected')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(6, 'NFI')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(7, 'Refer to Manager')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(8, 'Closed - Duplicate')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(9, 'Exported for Payment')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(10, 'Declined - Test')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
