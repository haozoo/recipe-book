import Head from 'next/head';
import { handleGoogleLogin, createAccount, handleEmailLogin } from '../services/auth';
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe App</title>
        <meta name='description' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </Head>

      <main className={styles.main}>
        <label for="txtEmail"> Email</label>
        <input type="email" id="txtEmail" name="txtEmail" />

        <label for="txtPassword"> Password</label>
        <input type="password" id="txtPassword" name="txtPassword" />

        <button onClick={createAccount}>Sign Up With Email</button>
        <button onClick={handleEmailLogin}>Sign In With Email</button>
        <button onClick={handleGoogleLogin}>Sign In With Google</button>

        <div id="divLoginError" class="group">
          <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
        </div>

        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      </main>
    </div>
  );
}
