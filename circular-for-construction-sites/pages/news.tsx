import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ControlPanel from "../components/ControlPanel";
import SecondLine from "../components/SecondLine";
import Articles from "../components/Articles";
import Footer from "../components/Footer";
import { db, auth } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function News(): JSX.Element {
  type UserInfo = {
    admin: boolean;
    area: string;
    email: string;
    name: string;
    section: string;
  };

  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    admin: false,
    area: "",
    email: "",
    name: "",
    section: "",
  });
  const [selectedAreaAndSection, setSelectedAreaAndSection] = useState("");
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  const titleProp: string = "回覧板";

  useEffect((): void => {
    if (user !== null && user !== undefined) {
      const userId = user.email;
      if (userId !== null) {
        getDoc(doc(db, "users", userId)).then((snapshot): void => {
          const document = snapshot.data() as UserInfo;
          document && setUserInfo(document);
        });
      }
    }
  }, []);

  useEffect((): void => {
    if (user === null) {
      router.push("/");
    }
  }, []);

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
        <ControlPanel
          brand={titleProp}
          setSelectedAreaAndSection={setSelectedAreaAndSection}
        />
        <SecondLine
          counter={counter}
          setCounter={setCounter}
          name={userInfo.name}
        />
        <Articles
          userInfoEmail={userInfo.email}
          userInfoName={userInfo.name}
          canAdmin={userInfo.admin}
          selectedAreaAndSection={selectedAreaAndSection}
          counter={counter}
          setCounter={setCounter}
        />
        <Footer />
      </>
    );
  }
  return <></>;
}

export default News;
