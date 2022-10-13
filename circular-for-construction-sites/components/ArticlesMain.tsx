import { useState, useEffect, SetStateAction } from "react";
import ArchiveButton from "../components/ArchiveButton";
import ConfirmBadge from "../components/ConfirmBadge";
import ArticleModal from "../components/ArticleModal";
import { db } from "../components/firebase";
import {
  collectionGroup,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type Props = {
  userInfoEmail: string;
  userInfoName: string;
  canAdmin: boolean;
  selectedAreaAndSection: string;
  counter: number;
  setCounter: (arg0: number) => void;
};

function ArticlesMain(props: Props): JSX.Element {
  const {
    userInfoEmail,
    userInfoName,
    canAdmin,
    selectedAreaAndSection,
    counter,
    setCounter,
  } = props;

  type ContentData = { docId: string; title: string; article: string };

  const contentArray: ContentData[] = [];
  const cardArray: JSX.Element[] = [];
  const [contentData, setContentData] = useState(contentArray);
  const [cardData, setCardData] = useState(cardArray);
  const [selectedID, setSelectedID] = useState("");
  const [show, setShow] = useState(false);

  useEffect((): void => {
    setCounter(counter + 1);
  }, [userInfoEmail, userInfoName]);

  const separatedData =
    selectedAreaAndSection !== "all" ? selectedAreaAndSection.split(",") : null;

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

  const targetArticle = contentData.find((article): boolean => {
    return article.docId === selectedID;
  });

  const openModal = (docId: SetStateAction<string>): void => {
    setSelectedID(docId);
    setShow(true);
  };

  const doDelete = async (docId: string): Promise<void> => {
    confirm("この投稿を削除しますか？") &&
      (await deleteDoc(doc(db, "users", userInfoEmail, "articles", docId))
        .then((): void => {
          setCounter(counter + 1);
        })
        .catch((err): void => {
          console.log("err: ", err);
        }));
  };

  useEffect((): void => {
    const docRef = collectionGroup(db, "articles");
    let q = query(docRef, orderBy("timestamp", "desc"));
    if (
      separatedData !== null &&
      separatedData[0] !== undefined &&
      separatedData[1] !== undefined
    )
      q = query(
        docRef,
        orderBy("timestamp", "desc"),
        where("to.area", "==", separatedData[0]),
        where("to.section", "==", separatedData[1])
      );
    getDocs(q).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        if (doc.archive === false) {
          contentArray.push({
            docId: document.id,
            title: doc.title,
            article: doc.article,
          });
          cardArray.push(
            <Card key={document.id} border="dark">
              <Card.Body>
                <Card.Text className="small text-muted d-flex justify-content-between">
                  From: {doc.name}（エリア{areaName(doc.from.area)}
                  {"　"}
                  {sectionName(doc.from.section)}）{postDate(doc.timestamp)}
                </Card.Text>
                <Card.Text className="d-flex justify-content-between">
                  <Button
                    variant="link"
                    onClick={(): void => openModal(document.id)}
                  >
                    <strong>{doc.title}</strong>
                  </Button>
                  <div>
                    {(doc.email === userInfoEmail || canAdmin === true) && (
                      <ArchiveButton
                        documentId={document.id}
                        contributorId={doc.email}
                        counter={counter}
                        setCounter={setCounter}
                      />
                    )}{" "}
                    {doc.email === userInfoEmail && (
                      <Button
                        variant='danger'
                        size="sm"
                        onClick={(): Promise<void> => doDelete(document.id)}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    )}
                  </div>
                </Card.Text>
                <Card.Text className="small text-muted d-flex justify-content-between">
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
                    counter={counter}
                    setCounter={setCounter}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          );
        }
      });
      setContentData(contentArray);
      setCardData(cardArray);
    });
  }, [counter, selectedAreaAndSection]);

  return (
    <>
      <style jsx>{`
        div {
          margin-bottom: 4rem;
        }
      `}</style>

      <div>
        <Stack gap={1}>{cardData}</Stack>
        <ArticleModal
          show={show}
          setShow={setShow}
          title={targetArticle?.title}
          article={targetArticle?.article}
        />
      </div>
    </>
  );
}

export default ArticlesMain;
