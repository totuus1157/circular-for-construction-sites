import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

function Footer(): JSX.Element {
  return (
    <Navbar className="justify-content-center" fixed="bottom">
      <Link href="/news">
        <a>
          <button>回覧板</button>
        </a>
      </Link>
      <Link href="/calendar">
        <a>
          <button>カレンダー</button>
        </a>
      </Link>
    </Navbar>
  );
}

export default Footer;
