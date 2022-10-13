import Button from "react-bootstrap/Button";

type Props = { counter: number; setCounter: (arg0: number) => void };

function UpdateButton(props: Props) {
  const { counter, setCounter } = props;
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={(): void => setCounter(counter + 1)}
    >
      <i className="bi bi-arrow-clockwise" style={{ fontSize: "1.2rem" }}></i>
    </Button>
  );
}

export default UpdateButton;
