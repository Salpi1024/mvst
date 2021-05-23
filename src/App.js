import './App.css';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from './Queries';
import RepoList from './components/RepoList/RepoList';
import Dashboard from './components/Dashboard/Dashboard';
import MidSection from './components/MidSection/MidSection';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
function App() {
  const defaultUser = {
    login: '',
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

  if (loading) {
    return (
      <div className="spinner-container" aria-label="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) return <h1> Error! {error.message}</h1>;
  return (
    <div className="App">
      <Dashboard />
      <RepoList user={user} />
      <MidSection setUser={setUser} defaultUser={defaultUser} />
    </div>
  );
}

export default App;
