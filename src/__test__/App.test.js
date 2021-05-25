import { render, screen } from '@testing-library/react';
import App from '../App';
import { MockedProvider } from '@apollo/client/testing';
import { mockQuery, mockErrorQuery, mockUser } from './mocks';

it('renders the LOGIN query', async () => {
  render(
    <MockedProvider mocks={mockQuery} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const mockUsername = await screen.findByText('@' + mockUser.login);
  const firstMockRepoName = await screen.findByText(mockUser.repositories.edges[0].node.name);
  expect(mockUsername).toBeInTheDocument();
  expect(firstMockRepoName).toBeInTheDocument();
});

it('The LOGIN query errors correctly', async () => {
  render(
    <MockedProvider mocks={mockErrorQuery} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const error = await screen.findByText('Error! An error occurred');
  expect(error).toBeInTheDocument();
});

it('The LOGIN query loads correctly', () => {
  render(
    <MockedProvider addTypename={false}>
      <App />
    </MockedProvider>
  );
  const loading = screen.getByLabelText('loading-spinner');
  expect(loading).toBeInTheDocument();
});
