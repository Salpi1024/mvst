/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './RepoList.css';

function RepoList({ user }) {
  const [repos, setRepos] = useState([]);
  const [defaultRepos, setDefaultRepos] = useState([]);
  useEffect(() => {
    if (user) {
      setRepos([
        ...user.repositories.edges,
        ...user.repositoriesContributedTo.edges.filter((repo) => repo.node.name !== 'Hogwarts'),
      ]);
      setDefaultRepos([
        ...user.repositories.edges,
        ...user.repositoriesContributedTo.edges.filter((repo) => repo.node.name !== 'Hogwarts'),
      ]);
    }
  }, [user]);
  const handleChange = (e) => {
    if (e.target.value === '') setRepos(defaultRepos);
    setRepos(() => defaultRepos.filter((repo) => repo.node.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };
  if (user) {
    return (
      <div className="RepoList">
        <div className="user-container">
          <img src={user.avatarUrl} className="profilePic" alt="profile picture"></img>
          <div>
            <h1>{user.name}</h1>
            <ul className="repo-names-list">
              <p>Here you can see {user.name.split(' ')[0]}&apos;s repositories</p>
              <input placeholder="Browse through them!" onChange={handleChange}></input>
              {repos ? (
                repos.map((repo) => (
                  <li className="repo-name" key={repo.node.id}>
                    {repo.node.name}
                  </li>
                ))
              ) : (
                <h1>No repos available with this name!</h1>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading</h1>;
}

export default RepoList;
