import { gql } from '@apollo/client';

const LOGIN = gql`
  query Query($login: String!) {
    user(login: $login) {
      name
      bio
      login
      avatarUrl(size: 1000)
      repositories(first: 100, isFork: true) {
        edges {
          node {
            id
            name
          }
        }
      }
      repositoriesContributedTo(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export { LOGIN };
