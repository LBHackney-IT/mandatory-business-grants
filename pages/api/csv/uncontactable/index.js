import * as HttpStatus from 'http-status-codes';
import AppContainer from '../../../../containers/AppContainer';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const container = AppContainer.getInstance();
        const listApplicationsCSV = container.getUncontactableListApplicationsCSV();
        res.statusCode = HttpStatus.OK;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'filename=uncontactable.csv');
        const csvResult = await listApplicationsCSV();
        res.end(csvResult.csvString);
      } catch (error) {
        console.log(
          'Uncontactable applications CSV error:',
          error,
          'request:',
          req
        );
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.end(
          JSON.stringify('Unable to generate an uncontactable applications CSV')
        );
      }
      break;

    default:
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.end(JSON.stringify('Invalid request method'));
  }
};
