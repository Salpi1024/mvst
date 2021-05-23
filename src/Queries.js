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
            name
            owner {
              login
            }
          }
        }
      }
      repositoriesContributedTo(first: 10) {
        edges {
          node {
            name
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

export { LOGIN };
