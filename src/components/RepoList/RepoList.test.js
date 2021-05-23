import RepoList from './RepoList';
import { render, screen } from '@testing-library/react';
import { mockUser } from '../../mocks';

describe('Testing general features of the RepoList component', () => {
  let component;
  beforeEach(() => {
    component = render(<RepoList user={mockUser} />);
  });

  test('should render RepoList', () => {
    render(<RepoList />);

    expect(screen.getByText('Definetely-a-terrible-app')).toBeInTheDocument();
  });
  afterEach(() => {
    component.unmount();
  });
});
