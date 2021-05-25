import { LOGIN } from '../GraphQL/Queries';
const mockUser = {
  login: 'AwesomeDev',
  avatarUrl: 'someavatar.jpg',
  bio: 'An awesome developer so awesome he/she does not even exist',
  name: 'Awesomeness',
  repositories: {
    edges: [
      { node: { name: 'amazing-app', owner: { login: 'AwesomeDev' } } },
      {
        node: {
          name: 'another-amazing-app',
          owner: {
            login: 'AwesomeDev',
          },
        },
      },
    ],
  },
  repositoriesContributedTo: {
    edges: [
      { node: { name: 'not-so-great-app', owner: { login: 'lessAwesomeDev' } } },
      {
        node: {
          name: 'Definetely-a-terrible-app',
          owner: {
            login: 'Salpi1024',
          },
        },
      },
    ],
  },
  // __typename: 'User',
};
const mockErrorQuery = [
  {
    request: {
      query: LOGIN,
      variables: {
        login: 'Salpi1024',
      },
    },
    error: new Error('An error occurred'),
  },
];

const mockQuery = [
  {
    request: {
      query: LOGIN,
      variables: {
        login: 'Salpi1024',
      },
    },
    result: {
      data: {
        user: {
          avatarUrl:
            'https://avatars.githubusercontent.com/u/72922743?s=1000&u=c332f8dcd7313f4a1fba4c896892482d4916de11&v=4',
          bio: '',
          name: mockUser.name,
          login: mockUser.login,
          repositoriesContributedTo: { ...mockUser.repositoriesContributedTo },
          repositories: { ...mockUser.repositories },
        },
      },
    },
  },
];
export { mockUser, mockQuery, mockErrorQuery };
