import axios from 'axios';

const fileUploader = async (file, clientGeneratedId) => {
  //Pretends to upload the file, this is used for local testing
  //return 'faked_it_out_for_local_testing.ext';

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
      'Content-Type': file.type,
    },
  });
  return data.fileKey;
};

export default fileUploader;
