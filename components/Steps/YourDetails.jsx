import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, TextInput, DateInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const Step1 = (props) => {
  const { register, control, errors, handleSubmit } = useForm({
    defaultValues: props.formData,
  });
  const onSubmit = (data) => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Your Details</h1>
      <TextInput
        {...getInputProps('contact', 'firstName', { register }, errors)}
      />
      <TextInput
        {...getInputProps('contact', 'lastName', { register }, errors)}
      />
      <TextInput
        {...getInputProps('contact', 'emailAddress', { register }, errors)}
      />
      <TextInput
        {...getInputProps('contact', 'telephoneNumber', { register }, errors)}
      />
      <AddressLookup
        {...getInputProps('contact', 'address', { register, control }, errors)}
        defaultValue={props.formData.contact && props.formData.contact.address}
      />
      <DateInput
        {...getInputProps('declaration', 'dateOfBirth', { control }, errors)}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Step1;
