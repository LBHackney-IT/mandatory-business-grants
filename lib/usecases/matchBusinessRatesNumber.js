import { GoogleSpreadsheet } from 'google-spreadsheet';

export const matchBusinessRatesNumber = async (businessRatesNumber) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/gm, '\n'),
  });
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  for (let i = 0; i < rows.length; i++) {
    if (businessRatesNumber === rows[i].account_id) {
      return 2;
    }
  }

  return 3;
};
