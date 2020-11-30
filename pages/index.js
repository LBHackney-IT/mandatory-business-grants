import Router from 'next/router';
import { isExpired } from 'utils/date';
import { stepPath, stepKeys } from 'components/Steps';

export default function Home({ date, expirationDate }) {
  return (
    <div>
      <h1>Apply for the COVID-19 Local Authority Business Grants Fund</h1>
      <p className="govuk-body">
        The Government has announced a series of grants for certain businesses
        affected by the COVID-19 pandemic, the tier restrictions introduced in
        London from October 2020, and the subsequent national lockdown period
        from 5 November 2020.
      </p>
      <p className="govuk-body">
        By completing this application form, you will be considered for:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          grant 1 -{' '}
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-your-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions-for-closed-businesses"
          >
            Local restrictions support grant (for closed businesses)
          </a>
        </li>
        <li>
          grant 2 -{' '}
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-your-nightclub-dance-hall-or-adult-entertainment-business-is-eligible-for-a-coronavirus-grant-due-to-national-restrictions"
          >
            Local restrictions support grant (sector)
          </a>
        </li>
        <li>
          grant 3 -{' '}
          <a
            className="govuk-link"
            href="https://www.gov.uk/guidance/check-if-youre-eligible-for-the-coronavirus-local-restrictions-support-grant-for-open-businesses"
          >
            Local restrictions support grant (open) for the Tier 2 restrictions
            period
          </a>
        </li>
      </ul>
      <p className="govuk-body">
        For further information, please go to{' '}
        <a className="govuk-link" href="https://hackney.gov.uk/business-grants">
          https://hackney.gov.uk/business-grants
        </a>
        .
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
