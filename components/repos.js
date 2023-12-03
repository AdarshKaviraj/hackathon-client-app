import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

async function fetchRepos(session) {
  const res = await fetch(
    `https://api.github.com/users/${session?.user?.name}/repos`
  ).then((response) => response.json());

  return res;
}

export default async function RepoList() {
  const session = await getServerSession(authOptions);

  const repos = await fetchRepos(session);

  return (
    <div className="flex flex-col py-20 bg-gray-200 ">
      {repos?.length > 0 && (
        <h2 className="my-4 ml-20 text-2xl font-semibold">
          Your GitHub Repositories
        </h2>
      )}
      <ul className="flex flex-col max-w-5xl mx-auto gap-y-3">
        {repos?.map((repo, index) => (
          <div key={index} className="flex flex-col items-start ">
            <div className="flex items-start leading-loose tracking-widest">
              <li key={repo.id}>{index + 1}. </li>
              <li key={repo.id}>
                <Link href={`/repos/${repo.name}`}>{repo.name}</Link>
              </li>
            </div>
            <div className="flex flex-col items-start">
              <li className="language">
                Langauges: {repo.language === null ? 'none' : repo.language}
              </li>
              <li className="date">Start date & time: {repo.created_at}</li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
