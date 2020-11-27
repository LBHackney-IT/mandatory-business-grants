DELETE FROM application_state WHERE id > 9;

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
VALUES(3, 'Pre-processed Review')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(4, 'Refer to Manager')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(5, 'Processed - Approved')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(6, 'Processed - Rejected')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(7, 'NFI')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(8, 'Exported for Payment')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;

INSERT INTO application_state(id, description)
VALUES(9, 'Declined - Test')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
