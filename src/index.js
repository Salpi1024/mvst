import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
/**
 * @param  client is a new instance of ApolloClient, it takes the uri,
 * and sends the headers in each query.
 */
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GH_URI}`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_MY_ENV}`,
  },
});
// ApolloProvider wraps the App component, making the queries available in the whole application.
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
