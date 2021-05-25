import RepoList from '../components/RepoList/RepoList';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockUser } from './mocks';
import userEvent from '@testing-library/user-event';

describe('Testing general features of the RepoList component', () => {
  beforeEach(() => {
    render(<RepoList user={mockUser} />);
  });

  it('should render RepoList', () => {
    expect(screen.getByText('Definetely-a-terrible-app')).toBeInTheDocument();
  });
  it("Should render the profile's username and link to it", () => {
    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('username-link')).toBeInTheDocument();
  });

  it('Should render a search bar, allow the user to type in it and filter through repositories', () => {
    //this will be filtered out in the next test to test the filtering handleChange function
    const filteredRepo = 'not-so-great-app';
    expect(screen.getByLabelText('repo-searchbar')).toBeInTheDocument();
    expect(screen.getByLabelText('repo-searchbar')).toHaveValue('');
    expect(screen.getByText(filteredRepo)).toBeInTheDocument();
  });

  it('Should let the user type in the Searchbar and filter through repositories', () => {
    const typedValue = 'amazing-app';
    const filteredRepo = 'not-so-great-app';
    userEvent.type(screen.getByLabelText('repo-searchbar'), typedValue);
    expect(screen.getByLabelText('repo-searchbar')).toHaveValue(typedValue);
    const input = screen.getByLabelText('repo-searchbar');
    fireEvent.change(input, { target: { value: typedValue } });
    expect(screen.getByText(typedValue)).toBeInTheDocument();
    expect(() => screen.getByText(filteredRepo)).toThrow();
  });
});
