import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { getAuth, signOut } from "firebase/auth";
import "../components/fire";

const auth = getAuth();
signOut(auth);

const Home: NextPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header title="Top Page" />

      <main className={styles.main}>
        <h1 className={styles.title}>電子観覧版</h1>

        <p className={styles.description}>for 建設現場</p>

        <div className={styles.grid}>
          <Link href="/login">
            <a className={styles.card}>
              <h2>ログイン</h2>
            </a>
          </Link>

          <Link href="/register">
            <a className={styles.card}>
              <h2>新規登録</h2>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
