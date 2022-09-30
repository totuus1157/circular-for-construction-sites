import { useState, useEffect, SetStateAction } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/fire";

const db = getFirestore();

function Articles(props) {
  const { user } = props;
  const mydata: SetStateAction<any[]> = [];
  const [data, setData] = useState(mydata);

  console.log("data: ", data);
  console.log("user: ", user);

  useEffect((): void => {
    getDocs(collection(db, "users", user?.email, "Articles")).then(
      (snapshot): void => {
        snapshot.forEach((document): void => {
          const doc = document.data();
          mydata.push(
            <Card>
              <Card.Body>
                <Card.Text key={document.id}>{doc.article}</Card.Text>
                <Card.Footer className="text-muted">Footer</Card.Footer>
              </Card.Body>
            </Card>
          );
          console.log("mydata: ", mydata);
        });
        setData(mydata);
      }
    );
  }, []);

  return <Stack gap={1}>{data}</Stack>;
}

export default Articles;
