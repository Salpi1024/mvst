/* eslint-disable react/prop-types */
import './MidSection.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../../Queries';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function MidSection({ setUser, defaultUser }) {
  const [searchNewUser, { data, error, loading }] = useLazyQuery(LOGIN, {
    fetchPolicy: 'network-only',
  });
  const [newUser, setNewUser] = useState('');
  const handleChange = (e) => {
    setNewUser(e.target.value);
  };
  const handleSubmit = () => {
    searchNewUser({ variables: { login: newUser } });
    setNewUser('');
  };
  if (data) {
    setUser(defaultUser);
    setUser(data.user);
  }
  if (loading) {
    return (
      <div className="mid-spinner">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="Dashboard">
      <section className="middle">
        <h3 className="bored">Bored of this user?</h3>
        <p className="type-line">
          {error
            ? 'Looks like we cannot find this user, are you sure you did not make any typos?'
            : 'Type here another username to display their profile!'}
        </p>
        <div className="search-button">
          <input
            className="midsection-searchbar"
            value={newUser}
            onChange={handleChange}
            placeholder="Don't make typos please!!"
          ></input>
          <button className="midsection-btn" onClick={handleSubmit}>
            Click here!
          </button>
        </div>
      </section>
    </div>
  );
}

export default MidSection;
