/* eslint-disable react/prop-types */
import React from 'react';

function RepoList({ user }) {
  if (user) {
    return (
      <div className="RepoList">
        <div className="user-dashboard">
          <h1>{user.name}</h1>
          <img src={user.avatarUrl}></img>
          <ul>
            {user.repositories.edges.map((repo) => (
              <li key={repo.node.id}>{repo.node.name}</li>
            ))}
          </ul>
          <ul>
            {user.repositoriesContributedTo.edges
              .filter((repo) => repo.node.name !== 'Hogwarts')
              .map((repo) => (
                <li key={repo.node.id}>{repo.node.name}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
  return <h1>Loading</h1>;
}

export default RepoList;
