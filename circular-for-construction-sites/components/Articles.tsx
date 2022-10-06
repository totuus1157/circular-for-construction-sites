import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function Articles(props: { counter: number }): JSX.Element {
  const { counter } = props;

  const mydata: JSX.Element[] = [];
  const [data, setData] = useState(mydata);

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
    getDocs(docRef).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        mydata.push(
          <Card className="small" border="dark">
            <Card.Body>
              <Card.Header className="text-muted">
                From: {doc.name}（エリア{areaName(doc.from.area)}
                {"　"}
                {sectionName(doc.from.section)}）{postDate(doc.timestamp)}
              </Card.Header>
              <Card.Text key={document.id}>{doc.article}</Card.Text>
              <Card.Footer className="text-muted">
                To: エリア{areaName(doc.to.area)}
                {"　"}
                {sectionName(doc.to.section)}
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
