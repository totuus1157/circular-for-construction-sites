import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { db, auth } from "../components/firebase";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SchedulePosts: NextPage = (): JSX.Element => {
  const [article, setArticle] = useState("");
  const [area, setArea] = useState("");
  const [section, setSection] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<DocumentData>({
    area: "",
    email: "",
    name: "",
    section: "",
  });
  const router = useRouter();

  console.log("user: ", user);
  console.log("loading: ", loading);
  console.log("error: ", error);
  console.log("userInfo: ", userInfo);

  useEffect((): void => {
    if (user !== null && user !== undefined) {
      const userId = user.email;
      if (userId !== null) {
        getDoc(doc(db, "users", userId)).then((snapshot): void => {
          const document = snapshot.data();
          document && setUserInfo(document);
        });
      }
    }
  }, []);

  useEffect((): void => {
    if (user === null) {
      router.push("/");
    }
  });

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    const docRef = collection(db, "users", userInfo.email, "articles");
    await addDoc(docRef, {
      article: article,
      from: { area: userInfo.area, section: userInfo.section },
      to: { area: area, section: section },
      name: userInfo.name,
      timestamp: serverTimestamp(),
    }).then((): void => {
      router.push("/news");
    });
  };

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div className={styles.container}>
        <Header title="予定登録" />

        <style jsx>{`
          h1 {
            margin-bottom: 4rem;
          }
        `}</style>

        <main className={styles.main}>
          <h1 className={styles.title}>予定登録</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTextarea">
              <Form.Label>内容</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                onChange={(e): void => {
                  setArticle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="datetimeBasicSelect1">
              <Form.Label>開始（単位：１時間）</Form.Label>
              <Form.Control
                type="datetime-local"
                min="2022-09-20T00:00"
                max="2025-09-19T23:59"
                step="3600"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="datetimeBasicSelect2">
              <Form.Label>終了（単位：１時間）</Form.Label>
              <Form.Control
                type="datetime-local"
                min="2022-09-20T00:00"
                max="2025-09-19T23:59"
                step="3600"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              書き込む
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={(): Promise<boolean> => router.push("/calendar")}
            >
              キャンセル
            </Button>
          </Form>
        </main>
      </div>
    );
  }
  return <></>;
};

export default SchedulePosts;
