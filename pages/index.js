import Head from 'next/head';
import { handleGoogleLogin } from '../services/auth';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recipe App</title>
        <meta name='description' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <button onClick={handleGoogleLogin}>Sign In</button>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      </main>
    </div>
  );
}
