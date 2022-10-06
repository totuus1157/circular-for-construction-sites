import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ControlPanel from "../components/ControlPanel";
import SecondLine from "../components/SecondLine";
import Calendar from "../components/Calendar";
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
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  console.log("counter: ", counter);

  const titleProp: string = "カレンダー";

  useEffect(() => {
    location.reload();
  }, []);

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
        <Header title={titleProp} />
        <ControlPanel name={userInfo.name} brand={titleProp} />
        <SecondLine
          counter={counter}
          setCounter={setCounter}
          name={userInfo.name}
        />
        <Calendar counter={counter} />
        <Footer />
      </>
    );
  }
  return <></>;
}

export default News;
