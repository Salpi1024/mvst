import './App.css';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from './Queries';
import RepoList from './components/RepoList/RepoList';
import Dashboard from './components/Dashboard/Dashboard';
import MidSection from './components/MidSection/MidSection';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
function App() {
  /**
   * @param {Object} defaultUser is the default state for the user.
   * It represents the shape of the object received by the GraphQL query
   * and it helps when switching to other profiles(extra-feature)
   */
  const defaultUser = {
    login: '',
    avatarUrl: '',
    bio: '',
    name: '',
    repositories: { edges: [] },
    repositoriesContributedTo: { edges: [] },
  };

  const [user, setUser] = useState(defaultUser);
  /**
   * This is the query that fetches the first profile to show to the user.
   * In this case I have chosen my personal Github profile.
   * useQuery is a hook coming from Apollo Client: https://www.apollographql.com/docs/react/data/queries/
   */
  const { loading, error, data } = useQuery(LOGIN, { variables: { login: 'Salpi1024' } });
  /**
   * On first render the @param {Object} data received from the query is set
   * to be the first profile to be shown to the user
   */
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);
  //While fetching the first profile a loading animation gets shown to the user.
  if (loading) {
    return (
      <div className="spinner-container" aria-label="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }
  //This if statement handles the rendering in case of an error while fetching data.
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
