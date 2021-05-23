import { render, screen } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
// import mockQuery from './mocks';
import { mockQuery } from './mocks';

it('renders the Login query', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mockQuery} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const userName = await findByText('Awesomeness');
  expect(userName).toBeInTheDocument();
  
});
