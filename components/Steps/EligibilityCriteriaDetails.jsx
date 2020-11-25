import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Button, Radios, Select, TextInput } from 'components/Form';
import { stepPath, getInputProps } from 'components/Steps';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';

import { BUSINESS_CATEGORIES, BUSINESS_SUB_WITH_FREETEXT } from 'lib/dbMapping';

const Step1 = (props) => {
  const { register, errors, handleSubmit, watch } = useForm({
    defaultValues: props.formData,
  });
  const [showError, setShowError] = useState(false);
  const onSubmit = (data) => {
    props.saveData(data);
    Router.push(stepPath, props.nextStep);
  };
  const selectedCategory = watch('eligibilityCriteriaDetails.businessCategory');
  const selectedSubCategory = watch(
    'eligibilityCriteriaDetails.businessSubCategory'
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby="step-hint"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Eligibility Criteria</h1>
          </legend>
          <span id="step-hint" className="govuk-hint">
            Applicants must meet all the eligibility questions to proceed to the
            next section
          </span>
          <Radios
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'businessSizeId',
              {
                register,
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <TextInput
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'howManyEmployees',
              {
                register,
              },
              errors
            )}
          />
          <Select
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'businessCategory',
              {
                register,
              },
              errors
            )}
          />
          {selectedCategory && (
            <Select
              {...getInputProps(
                'eligibilityCriteriaDetails',
                'businessSubCategory',
                {
                  register,
                },
                errors
              )}
              options={BUSINESS_CATEGORIES[selectedCategory]}
            />
          )}
          {BUSINESS_SUB_WITH_FREETEXT.includes(selectedSubCategory) && (
            <TextInput
              {...getInputProps(
                'eligibilityCriteriaDetails',
                'businessCustomCategory',
                {
                  register,
                },
                errors
              )}
            />
          )}
          <Radios
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'tradingOn220320',
              {
                register,
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'tradingOn161020',
              {
                register,
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'tradingOn041120',
              {
                register,
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
          <Radios
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'servedLegalNotices',
              {
                register,
              },
              errors
            )}
            onChange={() => setShowError(false)}
          />
        </fieldset>
      </div>
      {showError && (
        <ErrorSummary
          title="Unfortunately you are not eligible for this grant."
          body="The information provided does not meet the specified requirements."
        />
      )}
      {!showError && (
        <Button className="govuk-button" text="Next" type="submit" />
      )}
    </form>
  );
};

export default Step1;
