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
      <h2>How we will use your information</h2>
      <p className="govuk-body">
        The Council will not accept deliberate manipulation and fraud. Any
        business caught falsifying their records to gain additional grant money
        will face prosecution and any funding issued will be subject to
        clawback. We will use your information to assess your application for
        financial support. In doing so we will confirm information about you and
        your account from Council departments and credit reference agencies to
        confirm account validity and your identity. If you provide false or
        inaccurate information, we will record this.
      </p>
      <p className="govuk-body">
        This information will be stored in accordance with all relevant data
        protection requirements such as the UK General Data Protection
        Regulation (UK GDPR) and the Data Protection Act 2018 and shared with
        Government upon request. The information will be used by the Government
        for monitoring and evaluation purposes, as well as for prevention and
        detection of fraud and/or other criminal activities and for suspension
        and/or recovery of the grant where necessary. The Government may share
        information for the purpose of counter fraud activity and debt recovery
        with other government departments, agencies and/or local authorities.
      </p>
      <p className="govuk-body">
        If you would like full details on how we use your information, please
        refer to our{' '}
        <a href="https://hackney.gov.uk/privacy" target="_blank" rel="noopener">
          privacy policy
        </a>
        .
      </p>
      <Button className="govuk-button" text="Next" type="submit" />
    </form>
  );
};

export default Declaration;
