import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { TextArea, Button } from 'components/Form';

import styles from './Comments.module.css';

const Comments = ({
  applicationId,
  status,
  lrsgClosedBusinessesAmount,
  lrsgSectorAmount,
  lrsgOpenAmount,
  lrsgOpenVersion2Amount,
  cspAmount,
  cblgAmount,
  lrsgClosedTier2Amount,
  lrsgClosedTier3Amount,
  lrsgClosedTier4Amount,
  lrsgClosed5JanAmount,
  lrsgClosed5JanCycle2Amount,
  restartGrantAmount,
}) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { register, errors, handleSubmit, reset } = useForm();
  const fetchData = useCallback(async () => {
    setError(false);
    try {
      const { data } = await axios.get(
        `/api/applications/${applicationId}/comments`
      );
      setData(data.comments);
    } catch (e) {
      setError(e.response.data);
    }
  }, []);
  const postData = useCallback(async ({ notes }) => {
    setError(false);
    try {
      await axios.post(`/api/applications/${applicationId}/comments`, {
        notes,
      });
      fetchData();
      reset();
    } catch (e) {
      setError(e.response.data);
    }
  });
  useEffect(() => {
    fetchData();
  }, [
    applicationId,
    status,
    lrsgClosedBusinessesAmount,
    lrsgSectorAmount,
    lrsgOpenAmount,
    lrsgOpenVersion2Amount,
    cspAmount,
    cblgAmount,
    lrsgClosedTier2Amount,
    lrsgClosedTier3Amount,
    lrsgClosedTier4Amount,
    lrsgClosed5JanAmount,
    lrsgClosed5JanCycle2Amount,
    restartGrantAmount,
  ]);
  if (!applicationId) {
    return null;
  }
  return (
    <div className="govuk-!-margin-top-9">
      <h2 className="govuk-heading-l">Comments</h2>
      {data &&
        data.length > 0 &&
        data.map((comment) => (
          <div key={comment.dateTimeRecorded}>
            <div className="govuk-heading-s">
              {comment.userRecorded}
              <span className="govuk-caption-m">
                {new Date(comment.dateTimeRecorded).toLocaleString()}
              </span>
            </div>
            <pre className={styles.comment}>{comment.notes}</pre>
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          </div>
        ))}
      <form onSubmit={handleSubmit(postData)}>
        <TextArea
          name="notes"
          register={register({ required: true })}
          error={errors.notes}
        />
        <Button text="Add comment" type="submit" />
      </form>
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

Comments.propTypes = {
  applicationId: PropTypes.string.isRequired,
  status: PropTypes.string,
  lrsgClosedBusinessesAmount: PropTypes.string,
  lrsgSectorAmount: PropTypes.string,
  lrsgOpenAmount: PropTypes.string,
  lrsgOpenVersion2Amount: PropTypes.string,
  cspAmount: PropTypes.string,
  cblgAmount: PropTypes.string,
  lrsgClosedTier2Amount: PropTypes.string,
  lrsgClosedTier3Amount: PropTypes.string,
  lrsgClosedTier4Amount: PropTypes.string,
  lrsgClosed5JanAmount: PropTypes.string,
  lrsgClosed5JanAmountCycle2Amount: PropTypes.string,
  restartGrantAmount: PropTypes.string,
};

export default Comments;
