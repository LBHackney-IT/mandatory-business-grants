import axios from 'axios';

const fileUploader = async (file, clientGeneratedId) => {
  if (process.env.NEXT_PUBLIC_DISABLE_FILE_UPLOAD === 'true') {
    // Pretends to upload the file, this is used for local testing
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
