INSERT INTO application_state(id, description)
VALUES(11, 'Processed - Check Bank Details')
ON CONFLICT (id)
DO UPDATE
SET description = EXCLUDED.description;
