import UpdateButton from "../components/UpdateButton";
import UserDisplay from "../components/UserDisplay";

type Props = {
  counter: number;
  setCounter: (arg0: number) => void;
  name: string | null;
};

function SecondLine(props: Props): JSX.Element {
  const { counter, setCounter, name } = props;

  return (
    <>
      <style jsx>{`
        div {
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="d-flex justify-content-between">
        <UpdateButton counter={counter} setCounter={setCounter} />
        <UserDisplay name={name} />
      </div>
    </>
  );
}

export default SecondLine;
