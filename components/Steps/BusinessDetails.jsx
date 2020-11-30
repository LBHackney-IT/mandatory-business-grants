import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput, Select } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import AddressLookup from 'components/Form/AddressLookup/AddressLookup';

const businessIdetifyNumber = (businessType) => {
  switch (businessType) {
    case 'Company Number':
      return 'businessIdentifyNumberCompanyNumber';
    case 'VAT Registration Number':
      return 'businessIdentifyNumberVAT';
    case 'National Insurance Number':
      return 'businessIdentifyNumberNIN';
    case 'Unique Taxpayer Reference':
      return 'businessIdentifyNumberUTR';
    default:
      return 'businessIdentifyNumber';
  }
};

const Step1 = (props) => {
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: props.formData,
  });
  const onSubmit = (data) => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };
  const businessIdentifyType = watch('business.businessIdentifyType');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Business Details</h1>
      <TextInput
        {...getInputProps('business', 'businessName', { register }, errors)}
      />
      <TextInput
        {...getInputProps('business', 'registeredName', { register }, errors)}
      />
      <Select
        {...getInputProps(
          'business',
          'businessIdentifyType',
          { register },
          errors
        )}
      />
      {businessIdentifyType && (
        <TextInput
          {...getInputProps(
            'business',
            businessIdetifyNumber(businessIdentifyType),
            { register },
            errors
          )}
          name="business.businessIdentifyNumber"
          error={errors.business?.businessIdentifyNumber}
        />
      )}
      <TextInput
        {...getInputProps(
          'business',
          'businessRatesAccountNumber',
          { register },
          errors
        )}
      />
      <TextInput
        {...getInputProps(
          'business',
          'businessRatesPayer',
          { register },
          errors
        )}
      />
      <AddressLookup
        {...getInputProps(
          'business',
          'businessTradingAddress',
          { register },
          errors
        )}
      />
      <AddressLookup
        {...getInputProps('business', 'businessAddress', { register }, errors)}
      />
      <TextInput
        {...getInputProps(
          'business',
          'businessAnnualRent',
          { register },
          errors
        )}
      />
      <TextInput
        {...getInputProps('business', 'businessWebsite', { register }, errors)}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
