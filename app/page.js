import Hero from '@/components/hero';
import RepoList from '@/components/repos';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <RepoList />
    </>
  );
}
