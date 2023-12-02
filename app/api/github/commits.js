// pages/api/github/commits.js
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { repo } = req.query; // Pass the repository name as a query parameter

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repo}/commits`,
      {
        headers: {
          Authorization: `token ${session.accessToken}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching commit history from GitHub repo' });
  }
}
