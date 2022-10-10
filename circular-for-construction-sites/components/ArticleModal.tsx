import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Props = {
  show: boolean;
  setShow: (arg0: boolean) => void;
  title: string | undefined;
  article: string | undefined;
};

function ArticleModal(props: Props): JSX.Element {
  const { show, setShow, title, article } = props;

  const handleClose = (): void => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{article}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ArticleModal;
