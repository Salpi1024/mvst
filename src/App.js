import './App.css';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from './Queries';
import RepoList from './components/RepoList/RepoList';

function App() {
  const defaultUser = {
    avatarUrl: '',
    bio: '',
    name: '',
    repositories: { edges: [] },
    repositoriesContributedTo: { edges: [] },
    __typename: 'User',
  };
  const [user, setUser] = useState(defaultUser);
  const { loading, error, data } = useQuery(LOGIN, { variables: { login: 'Salpi1024' } });

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1> Error! ${error.message}</h1>;
  return (
    <div className="App">
      <RepoList user={user} />
    </div>
  );
}

export default App;
