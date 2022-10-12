import { auth } from "../components/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

function UserDisplay(props: { name: string | null }): JSX.Element {
  const { name } = props;
  const router = useRouter();

  const logout = (): void => {
    confirm("ログアウトしますか？") &&
      signOut(auth).then((): void => {
        router.push("/");
      });
  };

  return (
    <p>
      ログイン中：{" "}
      <a href="#!" onClick={logout}>
        {name}
      </a>
    </p>
  );
}

export default UserDisplay;
