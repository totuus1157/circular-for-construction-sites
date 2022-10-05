import { useState, useEffect, SetStateAction } from "react";
import { db } from "../components/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function Articles(): JSX.Element {
  const mydata: SetStateAction<any[]> = [];
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
    getDocs(collectionGroup(db, "articles")).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        mydata.push(
          <Card border="dark">
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
  }, []);

  return <Stack gap={1}>{data}</Stack>;
}

export default Articles;
