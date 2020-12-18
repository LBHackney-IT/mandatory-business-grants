# Resetting Exported Grants

In rare cases, the grants may be exported and the system marks them as exported using a status.

Previously this could be undone in the admin aread by going through all applications and editing the Status manually, however the new system will not let that be done as the status no longer controls if a file has been exported.

## Amend application DB records to allow second payment file export

To allow grants to be exported for payment, the relevant column on the `application_assessment` table needs to be updated. The easiest way to do this is with some SQL statements to update the relevant records in the database.

There is a jump box instance in EC2 called `RDS Jump Box - Covid Business Grants` to access the database (access details in README.md) using Session Manager.

To enable applications to be exported a second time, the record in the relevant column of either:

`lrsg_closed_businesses_payment_exported` or
`lrsg_sector_payment_exported` or
`lrsg_open_payment_exported`

To reset specific applications, you can use the export file application ID column to run the following SQL against all applications in the export file:

```
UPDATE
    application_assessment AS aa
SET
    <table_column_to_update> = FALSE,
    application_state_id = 9 -- MUST CORRESPEND TO CORRECT ID in application_state for Processed - Approved
FROM
    grant_application AS ga
WHERE
	  ga.client_generated_id IN (<application_id1>, <application_id2>)
AND
	  aa.grant_application_id = ga.id;
```
