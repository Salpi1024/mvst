import { render } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { mockQuery, mockErrorQuery } from './mocks';

it('renders the LOGIN query', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mockQuery} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const mockUsername = await findByText('Awesomeness');
  const firstMockRepoName = await findByText('another-amazing-app');
  expect(mockUsername).toBeInTheDocument();
  expect(firstMockRepoName).toBeInTheDocument();
});

it('The LOGIN query errors correctly', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mockErrorQuery} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const error = await findByText('Error! An error occurred');
  expect(error).toBeInTheDocument();
});

it('The LOGIN query loads correctly', () => {
  const { getByLabelText } = render(
    <MockedProvider addTypename={false}>
      <App />
    </MockedProvider>
  );
  const loading = getByLabelText('loading-spinner');
  expect(loading).toBeInTheDocument();
});
