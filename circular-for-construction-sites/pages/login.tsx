import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/Header";
import { getAuth } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/fire";

const auth = getAuth();

const SignIn: NextPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  console.log(email);
  console.log(password);
  console.log("user: ", user);
  console.log("loading: ", loading);
  console.log("error: ", error);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.user.email}</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Header title="ログイン" />

      <style jsx>{`
        h1 {
          margin-bottom: 4rem;
        }
      `}</style>

      <main className={styles.main}>
        <h1 className={styles.title}>ログイン</h1>

        <Form
          onSubmit={(): void => {
            signInWithEmailAndPassword(email, password);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control
              required
              type="email"
              onChange={(e): void => {
                setEmail(e.target.value);
              }}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control
              required
              type="password"
              minLength={8}
              maxLength={32}
              pattern="[0-9a-zA-Z]{8,32}"
              onChange={(e): void => {
                setPassword(e.target.value);
              }}
              placeholder="8〜32文字の英数字"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            ログイン
          </Button>
        </Form>
      </main>
    </div>
  );
};

export default SignIn;
