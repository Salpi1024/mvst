/* eslint-disable react/prop-types */
import './MidSection.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../../Queries';

function MidSection({ setUser, defaultUser }) {
  const [searchNewUser, { data }] = useLazyQuery(LOGIN, {
    fetchPolicy: 'network-only',
  });
  const [newUser, setNewUser] = useState('');
  const handleChange = (e) => {
    setNewUser(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    searchNewUser({ variables: { login: newUser } });
    setNewUser('');
  };
  if (data) {
    setUser(defaultUser);
    setUser(data.user);
  }
  return (
    <div className="Dashboard">
      <section className="middle">
        <h3 className="bored">Bored of this user?</h3>
        <p className="type-line">Type here another username to display their profile!</p>
        <div>
          <input
            className="repo-searchbar"
            value={newUser}
            onChange={handleChange}
            placeholder="Don't make typos please!!"
          ></input>
          <button onClick={handleSubmit}>Click here!</button>
        </div>
      </section>
    </div>
  );
}

export default MidSection;