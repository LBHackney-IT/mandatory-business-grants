import { useState } from 'react';

import { Select } from 'components/Form';
import { patchApplication } from 'utils/api/applications';

export const handleOnChange = (
  setError,
  setValue,
  onChange,
  grantApplicationPatcher,
  applicationId,
  storeAs
) => async (grantAmountAwarded) => {
  setError(false);
  try {
    await grantApplicationPatcher(applicationId, {
      [storeAs]: grantAmountAwarded,
    });
    setValue(grantAmountAwarded);
    onChange(grantAmountAwarded);
  } catch (e) {
    setError(e.response.data);
  }
};

const ApplicationGrantAmountSelector = ({
  grantAmountAwarded,
  onChange,
  applicationId,
  name,
  label,
  grantPaymentExported,
  options,
  storeAs,
}) => {
  const [error, setError] = useState();
  const [value, setValue] = useState(grantAmountAwarded);
  const tag = grantPaymentExported ? 'Exported' : null;
  return (
    <>
      <Select
        name={name}
        label={label}
        tag={tag}
        options={options}
        onChange={handleOnChange(
          setError,
          setValue,
          onChange,
          patchApplication,
          applicationId,
          storeAs
        )}
        value={value}
        error={error && { message: error }}
        isUnselectable={false}
      />
    </>
  );
};

export default ApplicationGrantAmountSelector;
