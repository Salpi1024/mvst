/* eslint-disable react/prop-types */
import './NewUserInput.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../../Queries';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
/**
 * @fileoverview this is a component I decided to
 * add on my own in order to make the app a little more interesting,
 * it lets the user type another username and switch profile to show in RepoList.
 * it is just that after a couple of hours developing @file RepoList
 * I got bored of looking at my face, sorry.
 */
function NewUserInput({ setUser, defaultUser }) {
  /**
   * In this case to fetch new data a @function LazyQuery is used
   * so that it triggers only when the user clicks
   *  on the button after digiting a new username to look for.
   */
  const [searchNewUser, { data, error, loading }] = useLazyQuery(LOGIN, {
    fetchPolicy: 'network-only',
  });
  const [newUser, setNewUser] = useState('');
  const handleChange = (e) => {
    setNewUser(e.target.value);
  };
  //After clicking the button the query can run and the input field is cleared
  const handleSubmit = () => {
    searchNewUser({ variables: { login: newUser } });
    setNewUser('');
  };
  //if a user is fetched it is set as the new one to show
  if (data) {
    setUser(defaultUser);
    setUser(data.user);
  }
  //while loading the spinner appears again
  if (loading) {
    return (
      <div className="mid-spinner">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="container--new-user-input">
      <h3 className="h3--bored-question">Bored of this user?</h3>
      <p className="p--invitation">
        {error
          ? 'Looks like we cannot find this user, are you sure you did not make any typos?'
          : 'Type here another username to display their profile!'}
      </p>
      <div className="container--input-btn">
        <input
          className="input--new-user"
          value={newUser}
          onChange={handleChange}
          placeholder="Don't make typos please!!"
        ></input>
        <button className="btn--new-user" onClick={handleSubmit}>
          Click here!
        </button>
      </div>
    </div>
  );
}

export default NewUserInput;
