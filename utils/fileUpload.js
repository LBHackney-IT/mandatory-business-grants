import axios from 'axios';

const fileUploader = async (file, clientGeneratedId) => {
  //Pretends to upload the file if the relevant flag is set, this is used for local testing
  if (process.env.FAKE_OUT_FILE_UPLOAD === 'true') {
    return 'faked_it_out_for_local_testing.ext';
  }

  const { data } = await axios.post('/api/urls', {
    clientGeneratedId: clientGeneratedId,
    fileName: file.name,
  });
  const formData = new FormData();
  Object.entries(data.fields).forEach(([key, value]) =>
    formData.append(key, value)
  );
  formData.append('file', file);
  await axios.post(data.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.fileKey;
};

export default fileUploader;
