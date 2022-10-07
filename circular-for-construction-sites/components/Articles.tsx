import { useState, useEffect } from "react";
import ConfirmBadge from "../components/ConfirmBadge";
import { db } from "../components/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

type Props = {
  userInfoEmail: string;
  userInfoName: string;
  counter: number;
  setCounter: (arg0: number) => void;
};

function Articles(props: Props): JSX.Element {
  const { userInfoEmail, userInfoName, counter, setCounter } = props;

  const mydata: JSX.Element[] = [];
  const [data, setData] = useState(mydata);

  console.log("userInfoEmail: ", userInfoEmail);
  console.log("userInfoName: ", userInfoName);

  useEffect((): void => {
    console.log("カウンター回すよ！");
    setCounter(counter + 1);
  }, [userInfoEmail, userInfoName]);

  const areaName = (area: string): string => {
    return area.toUpperCase();
  };
  const sectionName = (section: string): string => {
    return section.slice(0, 1).toUpperCase() + section.slice(1);
  };
  const postDate = (timestamp: { second: any; toDate: () => any }): string => {
    const date = timestamp.toDate();
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  useEffect((): void => {
    console.log("Side Effect!");
    const docRef = collectionGroup(db, "articles");
    getDocs(docRef).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        console.log("doc: ", doc);
        mydata.push(
          <Card key={document.id} className="small" border="dark">
            <Card.Body>
              <Card.Header className="text-muted">
                From: {doc.name}（エリア{areaName(doc.from.area)}
                {"　"}
                {sectionName(doc.from.section)}）{postDate(doc.timestamp)}
              </Card.Header>
              <Card.Text>{doc.article}</Card.Text>
              <Card.Footer className="text-muted">
                To: エリア{areaName(doc.to.area)}
                {"　"}
                {sectionName(doc.to.section)}
                {"　"}
                <ConfirmBadge
                  userInfoEmail={userInfoEmail}
                  userInfoName={userInfoName}
                  documentId={document.id}
                  contributorId={doc.email}
                  confirmed={doc.confirmed}
                />
              </Card.Footer>
            </Card.Body>
          </Card>
        );
      });
      setData(mydata);
    });
  }, [counter]);

  return (
    <>
      {" "}
      <style jsx>{`
        div {
          margin-bottom: 4rem;
        }
      `}</style>
      <div>
        <Stack gap={1}>{data}</Stack>
      </div>
    </>
  );
}

export default Articles;
