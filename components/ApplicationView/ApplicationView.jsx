import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import {
  LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT,
  LRSG_SECTOR_AMOUNT,
  LRSG_OPEN_AMOUNT,
  LRSG_CLOSED_TIER_2_AMOUNT,
  LRSG_CLOSED_TIER_3_AMOUNT,
  LRSG_CLOSED_TIER_4_AMOUNT,
  CSP_AMOUNT,
} from 'lib/dbMapping';
import { fetchApplication, patchApplication } from 'utils/api/applications';
import Summary from 'components/Summary/Summary';
import ExpandableDetails from 'components/ExpandableDetails/ExpandableDetails';
import ApplicationGrantAmountSelector from 'components/ApplicationGrantAmountSelector/ApplicationGrantAmountSelector';
import ApplicationStateSelector from 'components/ApplicationStateSelector/ApplicationStateSelector';
import Comments from 'components/Comments/Comments';
import { Checkbox } from 'components/Form';

const ApplicationView = ({ applicationId }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [status, setStatus] = useState();
  const [
    lrsgClosedBusinessesAmount,
    setLrsgClosedBusinessesAmount,
  ] = useState();
  const [lrsgSectorAmount, setLrsgSectorAmount] = useState();
  const [lrsgOpenAmount, setLrsgOpenAmount] = useState();
  const [cspAmount, setCspAmount] = useState();
  const [lrsgClosedTier2Amount, setLrsgClosedTier2Amount] = useState();
  const [lrsgClosedTier3Amount, setLrsgClosedTier3Amount] = useState();
  const [lrsgClosedTier4Amount, setLrsgClosedTier4Amount] = useState();
  const [validationRecap, setValidationRecap] = useState();
  const { register, watch, reset } = useForm({ defaultValues: {} });
  const watcher = watch({ nest: true });
  const validations = JSON.stringify(watcher);
  const [legitValidation, setLegitValidation] = useState();
  const fetchData = useCallback(async (applicationId) => {
    if (!applicationId) {
      return null;
    }
    setError(false);
    try {
      const { application, validations } = await fetchApplication(
        applicationId
      );
      setData(application);
      validations && reset(JSON.parse(validations));
      setValidationRecap(getValidationRecap(watcher));
    } catch (e) {
      setError(e.response.data);
    }
  }, []);
  const saveValidation = useCallback(async (validations) => {
    try {
      await patchApplication(applicationId, { validations });
    } catch {
      fetchData(applicationId);
    }
  });
  const getValidationRecap = useCallback((watcher) =>
    Object.entries(watcher).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: Object.values(value).every(Boolean),
      }),
      {}
    )
  );
  useEffect(() => {
    fetchData(applicationId);
  }, [applicationId]);
  useEffect(() => {
    if (validations !== '{}') {
      legitValidation ? saveValidation(validations) : setLegitValidation(true);
      setValidationRecap(getValidationRecap(watcher));
    }
  }, [validations]);
  return (
    <>
      {data && (
        <>
          <div className="govuk-main-wrapper">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <h1 className="govuk-!-margin-top-0">
                  {data.business.businessName}
                </h1>
                <div className="govuk-body">
                  Submitted: {new Date(data.applicationDate).toLocaleString()}
                </div>
                <div className="govuk-!-margin-top-7 govuk-!-margin-bottom-7">
                  <p className="govuk-body">
                    Email:{' '}
                    <a
                      href={`mailto:${data.contact.emailAddress}`}
                      target="_blank"
                    >
                      {data.contact.emailAddress}
                    </a>
                  </p>
                  {data.contact.telephoneNumber && (
                    <p className="govuk-body">
                      Phone:{' '}
                      <a
                        href={`tel:${data.contact.emailAddress}`}
                        target="_blank"
                      >
                        {data.contact.telephoneNumber}
                      </a>
                    </p>
                  )}
                </div>
                <Checkbox
                  name="nfi_check"
                  label="NFI Check"
                  register={register}
                />
              </div>
              <div className="govuk-grid-column-one-third">
                <ApplicationStateSelector
                  status={data.status}
                  applicationId={applicationId}
                  onChange={setStatus}
                />

                <ApplicationGrantAmountSelector
                  storeAs="lrsgClosedBusinessesAmount"
                  name="lrsg-closed-business"
                  label="LRSG (closed businesses)"
                  options={LRSG_CLOSED_BUSINESSES_GRANT_AMOUNT}
                  grantAmountAwarded={data.lrsgClosedBusinessesAmount}
                  grantPaymentExported={
                    data.lrsgClosedBusinessesPaymentExported
                  }
                  applicationId={applicationId}
                  onChange={setLrsgClosedBusinessesAmount}
                />

                <ApplicationGrantAmountSelector
                  storeAs="lrsgSectorAmount"
                  name="lrsg-sector"
                  label="LRSG (sector)"
                  options={LRSG_SECTOR_AMOUNT}
                  grantAmountAwarded={data.lrsgSectorAmount}
                  grantPaymentExported={data.lrsgSectorPaymentExported}
                  applicationId={applicationId}
                  onChange={setLrsgSectorAmount}
                />

                <ApplicationGrantAmountSelector
                  storeAs="lrsgOpenAmount"
                  name="lrsg-open"
                  label="LRSG (open)"
                  options={LRSG_OPEN_AMOUNT}
                  grantAmountAwarded={data.lrsgOpenAmount}
                  grantPaymentExported={data.lrsgOpenPaymentExported}
                  applicationId={applicationId}
                  onChange={setLrsgOpenAmount}
                />

                <ApplicationGrantAmountSelector
                  storeAs="cspAmount"
                  name="csp"
                  label="CSP"
                  options={CSP_AMOUNT}
                  grantAmountAwarded={data.cspAmount}
                  grantPaymentExported={data.cspPaymentExported}
                  applicationId={applicationId}
                  onChange={setCspAmount}
                />

                <ApplicationGrantAmountSelector
                  storeAs="lrsgClosedTier2Amount"
                  name="lrsg-closed-tier-2"
                  label="LRSG Closed (Tier 2)"
                  options={LRSG_CLOSED_TIER_2_AMOUNT}
                  grantAmountAwarded={data.lrsgClosedTier2Amount}
                  grantPaymentExported={data.lrsgClosedTier2PaymentExported}
                  applicationId={applicationId}
                  onChange={setLrsgClosedTier2Amount}
                />

                <ApplicationGrantAmountSelector
                  storeAs="lrsgClosedTier3Amount"
                  name="lrsg-closed-tier-3"
                  label="LRSG Closed (Tier 3)"
                  options={LRSG_CLOSED_TIER_3_AMOUNT}
                  grantAmountAwarded={data.lrsgClosedTier3Amount}
                  grantPaymentExported={data.lrsgClosedTier3PaymentExported}
                  applicationId={applicationId}
                  onChange={setLrsgClosedTier3Amount}
                />

                <ApplicationGrantAmountSelector
                  storeAs="lrsgClosedTier4Amount"
                  name="lrsg-closed-tier-4"
                  label="LRSG Closed (Tier 4)"
                  options={LRSG_CLOSED_TIER_4_AMOUNT}
                  grantAmountAwarded={data.lrsgClosedTier4Amount}
                  grantPaymentExported={data.lrsgClosedTier4PaymentExported}
                  applicationId={applicationId}
                  onChange={setLrsgClosedTier4Amount}
                />
              </div>
            </div>
          </div>

          <form>
            <Summary
              formData={data}
              filterOut={['supplementaryInformation']}
              register={register}
              isExpandable
              validationRecap={validationRecap}
            />
            <h2>Documents</h2>
            <ExpandableDetails>
              {data.documents.map(({ documentType, s3Path }) => (
                <div key={s3Path} className="govuk-body">
                  <a
                    className="govuk-link"
                    href={`/api/applications/${applicationId}/document/${s3Path}`}
                    target="_blank"
                  >
                    {documentType}
                  </a>
                </div>
              ))}
            </ExpandableDetails>
          </form>
          <Comments
            applicationId={applicationId}
            status={status}
            lrsgClosedBusinessesAmount={lrsgClosedBusinessesAmount}
            lrsgSectorAmount={lrsgSectorAmount}
            lrsgOpenAmount={lrsgOpenAmount}
            cspAmount={cspAmount}
            lrsgClosedTier2Amount={lrsgClosedTier2Amount}
            lrsgClosedTier3Amount={lrsgClosedTier3Amount}
            lrsgClosedTier4Amount={lrsgClosedTier4Amount}
          />
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

ApplicationView.propTypes = {
  applicationId: PropTypes.string.isRequired,
};

export default ApplicationView;
