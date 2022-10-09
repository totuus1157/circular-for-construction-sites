import { useState, useEffect } from "react";
import ConfirmBadge from "../components/ConfirmBadge";
import { db } from "../components/firebase";
import { collectionGroup, getDocs, query, orderBy } from "firebase/firestore";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

type Props = {
  userInfoEmail: string;
  userInfoName: string;
  canAdmin: boolean;
  counter: number;
  setCounter: (arg0: number) => void;
};

function Articles(props: Props): JSX.Element {
  const { userInfoEmail, userInfoName, canAdmin, counter, setCounter } = props;

  const mydata: JSX.Element[] = [];
  const [data, setData] = useState(mydata);

  useEffect((): void => {
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
    const docRef = collectionGroup(db, "articles");
    const q = query(docRef, orderBy("timestamp", "desc"));
    getDocs(q).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        mydata.push(
          <Card key={document.id} className="small" border="dark">
            <Card.Body>
              <Card.Header className="text-muted">
                From: {doc.name}（エリア{areaName(doc.from.area)}
                {"　"}
                {sectionName(doc.from.section)}）{postDate(doc.timestamp)}
              </Card.Header>
              <Card.Text>{doc.article}</Card.Text>
              <Card.Footer className="text-muted d-flex justify-content-between">
                To: エリア{areaName(doc.to.area)}
                {"　"}
                {sectionName(doc.to.section)}
                {"　"}
                <ConfirmBadge
                  userInfoEmail={userInfoEmail}
                  userInfoName={userInfoName}
                  canAdmin={canAdmin}
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
