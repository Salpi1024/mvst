/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './RepoList.css';
/**
 * @fileoverview this component renders the profile details,
 * their repo list, and filters the search of the user.
 */
function RepoList({ user }) {
  const [repos, setRepos] = useState([]);
  const [defaultRepos, setDefaultRepos] = useState([]);
  /**
   * After receiving the @param {props} user from the parent it sets their repos to two arrays.
   * This was done in order to concatenate the two arrays of repos(the ones owned by
   * the profile and the ones in which he/she is a contributor) and having two lists makes the filtering easier.
   * PS: in my profile I have noticed that a repo called Hogwarts was present both in the owned ones
   * and in those in which I was a contributor, I decided to filter one out.
   */
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
  //This is the function that filters through the repos according to user input.
  const handleChange = (e) => {
    if (e.target.value === '') setRepos(defaultRepos);
    setRepos(() => defaultRepos.filter((repo) => repo.node.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };
  if (user) {
    return (
      <div className="container--user-details">
        <div className="container--pic-name">
          <img src={user.avatarUrl} className="profilePic" alt="profile picture"></img>
          <p className="p--name">{user.name}</p>
          <a href={`https://github.com/${user.login}`} className="a a--username" aria-label="username-link">
            <h1 className="h1--username" aria-label="username">
              @{user.login}
            </h1>
          </a>
          {user.bio ? <p className="p--bio">{user.bio}</p> : null}
        </div>
        <div className="container--repo-list">
          {user && user.name ? (
            <p className="repo-introduction">{user.name.split(' ')[0]}&apos;s repositories</p>
          ) : null}
          <input
            className="searchbar--repo"
            aria-label="repo-searchbar"
            placeholder="Browse through them!"
            onChange={handleChange}
          ></input>
          <div className="container--repos">
            <ul className="list--repos">
              {repos.length ? (
                repos.map((repo, index) => (
                  <a
                    className="a a--repo-link"
                    key={index}
                    href={`https://github.com/${repo.node.owner.login}/${repo.node.name}`}
                  >
                    <li className="li--repo-name">{repo.node.name}</li>
                  </a>
                ))
              ) : (
                <p className="p--repos-not-found">No repos available with this name!</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RepoList;
