import Button from "react-bootstrap/Button";
import { db } from "../components/firebase";
import { doc, updateDoc } from "firebase/firestore";

type Props = { documentId: string; contributorId: string };

function ArchiveButton(props: Props): JSX.Element {
  const { documentId, contributorId } = props;

  console.log("documentId: ", documentId);

  const archive = async (docId: string): Promise<void> => {
    const docRef = doc(db, "users", contributorId, "articles", docId);
    await updateDoc(docRef, { archive: true })
      .then((): void => {
        console.log("アーカイブできた！");
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
