import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar/NavBar';

test('should render Dashboard', () => {
  const component = render(<NavBar />);

  expect(screen.getByText('REPOS FOR MVST')).toBeInTheDocument();
  component.unmount();
});
