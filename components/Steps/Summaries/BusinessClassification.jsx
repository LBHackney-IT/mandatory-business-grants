import ExpandableDetails from 'components/ExpandableDetails/ExpandableDetails';

export default () => (
  <ExpandableDetails summary="Help with business classification">
    <p>As defined in the Companies Act 2006. Please see definitions below:</p>
    <p>
      <strong>Micro business</strong>: must have at least two of the following;
      not more than 10 employees, a turnover of not more than £632,000, and a
      balance sheet total of not more than £316,000.
    </p>
    <p>
      <strong>Small business</strong>: must have at least two of the following;
      not more than 50 employees, a turnover of not more than £10.2 million and
      a balance sheet total of not more than £5.1m.
    </p>
    <p>
      <strong>Medium business</strong>: must have at least two of the following:
      not more than 250 employees, a turnover of not more than £36 million and a
      balance sheet total of not more than £18m.
    </p>
    <p>
      <strong>Large business</strong>: must have at least two of the following:
      more than 250 employees, a turnover of more than £36m, and a balance sheet
      total of more than £18m
    </p>
  </ExpandableDetails>
);
