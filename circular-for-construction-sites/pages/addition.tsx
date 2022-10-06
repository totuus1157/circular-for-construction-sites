import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { db, auth } from "../components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

console.log("db: ", db);

const Addition: NextPage = (): JSX.Element => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [section, setSection] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect((): void => {
    if (user === null) {
      router.push("/");
    }
  });

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    const docRef = doc(db, "users", user?.email as any);
    await setDoc(docRef, {
      name: name,
      area: area,
      section: section,
      email: user?.email,
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
        <Header title="あなたの情報" />

        <style jsx>{`
          h1 {
            margin-bottom: 4rem;
          }
        `}</style>

        <main className={styles.main}>
          <h1 className={styles.title}>あなたの情報</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>名前</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e): void => {
                  setName(e.target.value);
                }}
                placeholder="湊　未来"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSelect1">
              <Form.Label>エリア</Form.Label>
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
              <Form.Label>セクション</Form.Label>
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
              登録
            </Button>
          </Form>
        </main>
      </div>
    );
  }
  return <></>;
};

export default Addition;
