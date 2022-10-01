import Head from 'next/head';
import {
  handleGoogleLogin,
  createAccount,
  handleEmailLogin,
} from "../services/auth";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recipe App</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Landing Page</h1>

        <div className="flex flex-col w-40">
          <label htmlFor="txtEmail"> Email</label>
          <input type="email" id="txtEmail" name="txtEmail" />
          <label htmlFor="txtPassword"> Password</label>
          <input type="password" id="txtPassword" name="txtPassword" />
          <button onClick={createAccount}>Sign Up With Email</button>
          <button onClick={handleEmailLogin}>Sign In With Email</button>
          <button onClick={handleGoogleLogin}>Sign In With Google</button>
        </div>
        <div id="divLoginError" className="group">
          <div id="lblLoginErrorMessage" className="errorlabel">
            Error message
          </div>
        </div>
      </main>
    </div>
  );
}
