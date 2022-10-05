import { auth } from "../components/firebase";
import { signOut } from "firebase/auth";

function UserDisplay(props: { name: string | null }): JSX.Element {
  const { name } = props;
  const logout = (): void => {
    confirm("ログアウトしますか？") && signOut(auth);
  };

  return (
    <p>
      ログイン中：{" "}
      <a href="javascript:void(0);" onClick={logout}>
        {name}
      </a>
    </p>
  );
}

export default UserDisplay;
