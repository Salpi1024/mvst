import { gql } from '@apollo/client';

const LOGIN = gql`
  query Query($login: String!) {
    user(login: $login) {
      name
      bio
      avatarUrl(size: 1000)
      repositories(first: 10, isFork: true) {
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
