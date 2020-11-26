import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Checkbox, Select, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';

const Declaration = (props) => {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: props.formData,
  });
  const onSubmit = (data) => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Declaration</h1>
      <TextInput
        {...getInputProps(
          'declaration',
          'name',
          {
            register,
          },
          errors
        )}
      />
      <Select
        {...getInputProps(
          'declaration',
          'contactTypeId',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'authoriseOnBehalf',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessMeetsCriteria',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessIntendsReopen',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessIWillInform',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessNotExceed',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessNotUndertaking',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessNotRatePayer',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessPermitData',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessShareWithBEIS',
          {
            register,
          },
          errors
        )}
      />
      <Checkbox
        {...getInputProps(
          'declaration',
          'businessHappyContacted',
          {
            register,
          },
          errors
        )}
      />
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Declaration;
