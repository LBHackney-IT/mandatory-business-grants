import { render } from '@testing-library/react';

import Home from '../pages/index';

describe('Home Page', () => {
  it('should render properly', () => {
    const { queryByRole } = render(
      <Home
        date={new Date('2020-06-25').getTime()}
        expirationDate="2020-06-26 23:00"
      />
    );
    expect(queryByRole('button')).toBeDefined();
  });

  it('should NOT render the button if expired', () => {
    const { queryByRole } = render(
      <Home
        date={new Date('2020-06-28').getTime()}
        expirationDate="2020-06-26 23:00"
      />
    );
    expect(queryByRole('button')).not.toBeDefined;
  });
});
