'use client';
import { useEffect, useState } from 'react';

function RepoList() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('/api/github/repos')
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((error) => console.error('Error fetching repos:', error));
  }, []);

  return (
    <div>
      <h2>Your GitHub Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
