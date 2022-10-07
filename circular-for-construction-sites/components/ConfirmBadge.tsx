import { db } from "../components/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Button from "react-bootstrap/Button";

type Props = {
  documentId: string;
  contributorId: string;
  userInfoEmail: string;
  userInfoName: string;
};

function ConfirmBadge(props: Props) {
  const {
    documentId: documentId,
    contributorId,
    userInfoEmail,
    userInfoName,
  } = props;

  const confirm = async (
    documentId: string,
    contributorId: string
  ): Promise<void> => {
    if (userInfoName !== "") {
      console.log("ここまで来た", userInfoName);
      const docRef = doc(db, "users", contributorId, "articles", documentId);
      await updateDoc(docRef, {
        confirmed: arrayUnion({ id: userInfoEmail, name: userInfoName }),
      }).then((): void => {
        console.log("読んだ！");
      });
    } else {
      console.log("名前が空っぽだよ！", userInfoName);
    }
  };

  return (
    <Button
      variant="dark"
      size="sm"
      onClick={(): Promise<void> => confirm(documentId, contributorId)}
    >
      Check
    </Button>
  );
}

export default ConfirmBadge;
