import './App.css';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from './query';
import RepoList from './components/RepoList';

function App() {
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(LOGIN, { variables: { login: 'Salpi1024' } });
  useEffect(() => {
    if (data) {
      setUser(data.user);
    console.log(user)};  // eslint-disable-line 
  }, [data, user]);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1> Error! ${error.message}</h1>;
  return (
    <div className="App">
      <RepoList user={user} />
    </div>
  );
}

export default App;
