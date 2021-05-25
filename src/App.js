import './App.css';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from './GraphQL/Queries';
import RepoList from './components/RepoList/RepoList';
import NavBar from './components/NavBar/NavBar';
import NewUserInput from './components/NewUserInput/NewUserInput';
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
      <div className="App">
        <NavBar />
        <div className="container--spinner" aria-label="loading-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  //This if statement handles the rendering in case of an error while fetching data.
  if (error)
    return (
      <div className="App">
        <NavBar />
        <h1>Look like we have encountered an error</h1>
        <p> Error! {error.message}</p>;
      </div>
    );

  return (
    <div className="App">
      <NavBar />
      <RepoList user={user} />
      <NewUserInput setUser={setUser} defaultUser={defaultUser} />
    </div>
  );
}

export default App;
