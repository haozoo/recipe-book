import Head from "next/head";
import { handleGoogleLogin } from "../services/auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe App</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={handleGoogleLogin}>Sign In</button>
      </main>
    </div>
  );
}
