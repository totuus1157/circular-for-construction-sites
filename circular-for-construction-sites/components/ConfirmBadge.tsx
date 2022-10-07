import { db } from "../components/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

type Props = {
  documentId: string;
  contributorId: string;
  userInfoEmail: string;
  userInfoName: string;
  confirmed: { id: string; name: string }[];
};

function ConfirmBadge(props: Props) {
  const {
    documentId: documentId,
    contributorId,
    userInfoEmail,
    userInfoName,
    confirmed,
  } = props;

  console.log("userInfoName: ", userInfoName);
  console.log("userInfoEmail: ", userInfoEmail);
  console.log("confirmed: ", confirmed);

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

  if (
    confirmed.some((e): boolean => {
      return e.id === userInfoEmail;
    })
  ) {
    return (
      <Button variant="primary" size="sm">
        既読数 <Badge bg="secondary">{confirmed.length}</Badge>
      </Button>
    );
  } else if (contributorId === userInfoEmail) {
    return (
      <OverlayTrigger
        placement="bottom-start"
        overlay={
          <Tooltip id="tooltip-right">
            {confirmed.map((obj) => {
              return `${obj.name}　`;
            })}
          </Tooltip>
        }
      >
        <Button variant="primary" size="sm">
          既読者 <Badge bg="secondary">{confirmed.length}︎</Badge> ▶
        </Button>
      </OverlayTrigger>
    );
  } else {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={(): Promise<void> => confirm(documentId, contributorId)}
      >
        読んだ
      </Button>
    );
  }
}

export default ConfirmBadge;
