import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ControlPanel from "../components/ControlPanel";
import UserDisplay from "../components/UserDisplay";
import Articles from "../components/Articles";
import Footer from "../components/Footer";
import { db, auth } from "../components/firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function News(): JSX.Element {
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
      <>
        <Header title="ニュース" />
        <ControlPanel name={userInfo.name} />
        <UserDisplay name={userInfo.name} />
        <Articles
          userId={userInfo.email}
          name={userInfo.name}
          area={userInfo.area}
          section={userInfo.section}
        />
        <Footer />
        {/* <entryButton /> */}
      </>
    );
  }
  return <></>;
}

export default News;
