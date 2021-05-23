import Dashboard from './Dashboard';
import { render, screen } from '@testing-library/react';

test('should render Dashboard', () => {
  const component = render(<Dashboard />);

  expect(screen.getByText('REPOS FOR MVST')).toBeInTheDocument();
  component.unmount();
});