import Button from "react-bootstrap/Button";
import { db } from "../components/firebase";
import { doc, updateDoc } from "firebase/firestore";

type Props = {
  documentId: string;
  contributorId: string;
  counter: number;
  setCounter: (arg0: number) => void;
};

function ArchiveButton(props: Props): JSX.Element {
  const { documentId, contributorId, counter, setCounter } = props;

  const archive = async (docId: string): Promise<void> => {
    const docRef = doc(db, "users", contributorId, "articles", docId);
    await updateDoc(docRef, { archive: true })
      .then((): void => {
        alert("記事をアーカイブしました");
        setCounter(counter + 1);
      })
      .catch((err): void => {
        console.log("err: ", err);
      });
  };

  return (
    <Button size="sm" onClick={(): Promise<void> => archive(documentId)}>
      アーカイブ
    </Button>
  );
}

export default ArchiveButton;
