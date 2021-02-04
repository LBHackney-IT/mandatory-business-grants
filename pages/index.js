import Router from 'next/router';
import { isExpired } from 'utils/date';
import { stepPath, stepKeys } from 'components/Steps';

export default function Home({ date, expirationDate }) {
  return (
    <div>
      <h1>Apply for the COVID-19 Local Authority Business Grants Fund</h1>
      <p className="govuk-body">
        The Council is administering a series of government grants for
        businesses affected by the COVID-19 pandemic, the tier restrictions and
        national lockdown periods.
      </p>
      <p className="govuk-body">
        By completing this application form, you will be considered for:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions-for-closed-businesses"
          >
            Local Restrictions Support Grant (Closed) Addendum
          </a>{' '}
          (Grant 1)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-your-nightclub-dance-hall-or-adult-entertainment-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions"
          >
            Local Restrictions Support Grant (Sector)
          </a>{' '}
          (Grant 2)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-open-businesses"
          >
            Local Restrictions Support Grant (Open)
          </a>
          , October 2020 (Grant 3)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-open-businesses"
          >
            Local Restrictions Support Grant (Open)
          </a>
          , December 2020 (Grant 4)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-closed-businesses"
          >
            Local Restrictions Support Grant (Closed)
          </a>{' '}
          (Grant 5)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-closed-businesses"
          >
            Local Restrictions Support Grant (Closed) Addendum: Tier 4
          </a>{' '}
          (Grant 6)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-christmas-support-payment-for-wet-led-pubs"
          >
            Christmas Support Payment for wet-led pubs
          </a>{' '}
          (Grant 7)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions-for-closed-businesses"
          >
            Local Restrictions Support Grant (Closed) Addendum: 5 January 2021
          </a>{' '}
          (Grant 8)
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-the-coronavirus-closed-businesses-lockdown-payment"
          >
            Closed Business Lockdown Grant
          </a>{' '}
          (Grant 9)
        </li>
      </ul>
      <p className="govuk-body">
        Check{' '}
        <a className="govuk-link" href="https://hackney.gov.uk/business-grants">
          national and local restrictions business grants
        </a>{' '}
        for more information by Hackney Council.
      </p>
      {(!expirationDate ||
        !isExpired(new Date(expirationDate), new Date(date))) && (
        <button
          href="#"
          role="button"
          draggable="false"
          className="govuk-button govuk-button--start govuk-!-margin-top-3"
          data-module="govuk-button"
          onClick={() => Router.push(stepPath, `/step/${stepKeys[0]}`)}
        >
          Start now
          <svg
            className="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      date: new Date().getTime(),
      expirationDate: process.env.EXPIRATION_DATE || null,
    },
  };
};
