import { useState, useCallback } from 'react';

import { Select } from 'components/Form';
import { patchApplication } from 'utils/api/applications';

const ApplicationGrantAmountSelector = ({
  grantAmountAwarded,
  onChange,
  applicationId,
  name,
  label,
  options,
  storeAs,
}) => {
  const [error, setError] = useState();
  const [value, setValue] = useState(grantAmountAwarded);
  const handleOnChange = useCallback(async (grantAmountAwarded) => {
    setError(false);
    try {
      await patchApplication(applicationId, { [storeAs]: grantAmountAwarded });
      setValue(grantAmountAwarded);
      onChange(grantAmountAwarded);
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  }, []);
  return (
    <>
      <Select
        name={name}
        label={label}
        options={options}
        onChange={handleOnChange}
        value={value}
        error={error && { message: error }}
        isUnselectable={false}
      />
    </>
  );
};

export default ApplicationGrantAmountSelector;
