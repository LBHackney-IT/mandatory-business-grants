import ExpandableDetails from 'components/ExpandableDetails/ExpandableDetails';

export default () => (
  <ExpandableDetails summary="Help with business classification">
    <p>
      <strong>Micro business</strong>: 0-9 employees
    </p>
    <p>
      <strong>Small business</strong>: 10-49 employees
    </p>
    <p>
      <strong>Medium business</strong>: 50-250 employees
    </p>
    <p>
      <strong>Large business</strong>: more than 250 employees
    </p>
  </ExpandableDetails>
);
