import './App.css';
import {
  useQuery,
  gql
} from '@apollo/client';
import {useEffect} from 'react'

const LOGIN = gql `
query Query($login: String!) {
    user(login: $login) {
    bio
    email
  } 
    }
  
`

function App() {
  const { loading, error, data } = useQuery(LOGIN, {variables: {login: "Salpi1024"} });
  useEffect(() => {
   if(data) console.log(data);
  
  }, [data])
  if (loading) return <h1>Loading...</h1> ;
  if (error) return <h1> Error! ${error.message}</h1>;
  return (
    
    <div className="App">
     <h1>{data.user.email}</h1>  
    </div>

    
  );
}

export default App;
