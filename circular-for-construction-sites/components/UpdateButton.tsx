import Button from "react-bootstrap/Button";

type Props = { counter: number; setCounter: (arg0: number) => void };

function UpdateButton(props: Props) {
  const { counter, setCounter } = props;
  return (
    <Button variant="secondary" size="sm" onClick={(): void => setCounter(counter + 1)}>
      更新
    </Button>
  );
}

export default UpdateButton;
