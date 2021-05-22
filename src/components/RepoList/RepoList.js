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
        <div className="user-details-container">
          <div className="picture-name-container">
            <img src={user.avatarUrl} className="profilePic" alt="profile picture"></img>
            <p className="name">{user.name}</p>
            <a href={`https://github.com/${user.login}`}>
              <h1 className="username">@{user.login}</h1>
            </a>
            {user.bio ? <p className="bio">{user.bio}</p> : null}
          </div>
          <div>
            <p>Here you can see {user.name.split(' ')[0]}&apos;s repositories</p>
            <input className="repo-searchbar" placeholder="Browse through them!" onChange={handleChange}></input>
            <div className="repos-container">
              <ul className="repo-names-list">
                {repos ? (
                  repos.map((repo, index) => (
                    <li className="repo-name" key={index}>
                      <a className="repo-link" href={`https://github.com/${user.login}/${repo.node.name}`}>
                        {repo.node.name}
                      </a>
                    </li>
                  ))
                ) : (
                  <h1>No repos available with this name!</h1>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading</h1>;
}

export default RepoList;
