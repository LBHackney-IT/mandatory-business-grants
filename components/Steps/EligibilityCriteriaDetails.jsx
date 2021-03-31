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
    const isNotEligible = Object.entries(data.eligibilityCriteriaDetails).find(
      ([key, value]) => key === 'servedLegalNotices' && value === 'Yes'
    );
    setShowError(isNotEligible);
    if (!isNotEligible) {
      props.saveData(data);
      Router.push(stepPath, props.nextStep);
    }
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
            <h1 className="govuk-fieldset__heading">Business Details</h1>
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
          <hr className="govuk-section-break govuk-section-break--visible" />
          <h2 className="govuk-heading-m govuk-!-margin-top-3">
            Grant Eligibility Self-Declaration
          </h2>
          <span className="govuk-hint">
            The below questions act as a self-declaration, determining your
            business’ eligibility for the relevant grants. Please ensure that
            you read the eligibility criteria carefully when completing this
            section.
          </span>
          <span className="govuk-hint govuk-!-margin-bottom-5 govuk-!-font-weight-bold">
            Businesses that have continued to offer delivery/takeaway/click and
            collect services throughout the restriction periods are still
            entitled to the grants, provided this was not your primary method of
            trading on the day before the relevant local restriction period came
            into effect.
          </span>
          <Radios
            {...getInputProps(
              'eligibilityCriteriaDetails',
              'tradingOn040121Cycle2',
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
              'tradingOn010421',
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
