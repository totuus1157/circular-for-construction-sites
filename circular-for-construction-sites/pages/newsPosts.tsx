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

const NewsPosts: NextPage = (): JSX.Element => {
  const [title, setTitle] = useState("");
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
      title: title,
      article: article,
      from: { area: userInfo.area, section: userInfo.section },
      to: { area: area, section: section },
      name: userInfo.name,
      email: userInfo.email,
      confirmed: [],
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
        <Header title="新規投稿" />

        <style jsx>{`
          h1 {
            margin-bottom: 4rem;
          }
        `}</style>

        <main className={styles.main}>
          <h1 className={styles.title}>新規投稿</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>タイトル</Form.Label>
              <Form.Control
                required
                onChange={(e): void => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicSelect1">
              <Form.Label>送り先：エリア</Form.Label>
              <Form.Select
                onChange={(e): void => {
                  setArea(e.target.value);
                }}
              >
                <option>-- 選択してください --</option>
                <option value="a">A(Process Area)</option>
                <option value="b">B(Utility Area)</option>
                <option value="c">C(Offsite)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSelect2">
              <Form.Label>送り先：セクション</Form.Label>
              <Form.Select
                onChange={(e): void => {
                  setSection(e.target.value);
                }}
              >
                <option>-- 選択してください --</option>
                <option value="civil">Civil</option>
                <option value="building">Building</option>
                <option value="mechanical">Mechanical</option>
                <option value="piping">Piping</option>
                <option value="erectrical">Erectrical</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              書き込む
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={(): Promise<boolean> => router.push("/news")}
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

export default NewsPosts;
