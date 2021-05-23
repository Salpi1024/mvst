import { render } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { mockQuery } from './mocks';

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
