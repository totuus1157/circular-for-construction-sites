import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button'

function Footer(): JSX.Element {
  return (
    <Navbar className="justify-content-around" fixed="bottom">
      <Link href="/news">
        <a>
          <Button>回覧板</Button>
        </a>
      </Link>
      <Link href="/calendar">
        <a>
          <Button>カレンダー</Button>
        </a>
      </Link>
      <Link href="/archives">
        <a>
          <Button>アーカイブ</Button>
        </a>
      </Link>
    </Navbar>
  );
}

export default Footer;
