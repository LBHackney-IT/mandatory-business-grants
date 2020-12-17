import { nanoid } from 'nanoid';
import createGateway from '../gateways/s3';
import s3config from '../s3config';

const documents = createGateway({
  ...s3config,
  configuration: {
    urlPrefix: process.env.URL_PREFIX,
    maxUploadBytes: 20971520,
  },
});

export default async (dropboxId, fileName) => {
  const documentId = nanoid(15);
  const uploadOptions = await documents.createUploadUrl(
    dropboxId,
    documentId,
    fileName
  );
  return { documentId, ...uploadOptions };
};
