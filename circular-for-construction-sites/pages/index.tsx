import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
          <Header title="Top Page" />

      <main className={styles.main}>
        <h1 className={styles.title}>電子観覧版</h1>

        <p className={styles.description}>for 建設現場</p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>ログイン</h2>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>新規登録</h2>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
