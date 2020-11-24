import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const Step1 = (props) => {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: props.formData,
  });
  const onSubmit = (data) => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Business Details</h1>
      <TextInput
        {...getInputProps('business', 'businessName', { register }, errors)}
      />
      <TextInput
        {...getInputProps('business', 'registeredName', { register }, errors)}
      />
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
          { register, control },
          errors
        )}
        defaultValue={
          props.formData.business &&
          props.formData.business.businessTradingAddress
        }
      />
      <AddressLookup
        {...getInputProps(
          'business',
          'businessAddress',
          { register, control },
          errors
        )}
        defaultValue={
          props.formData.business && props.formData.business.businessAddress
        }
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
