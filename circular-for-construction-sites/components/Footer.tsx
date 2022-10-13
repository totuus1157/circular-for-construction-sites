import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Footer(): JSX.Element {
  return (
    <Navbar className="justify-content-around" fixed="bottom">
      <Link href="/news">
        <a>
          <Button>
            <i className="bi bi-newspaper"></i>
          </Button>
        </a>
      </Link>
      <Link href="/calendar">
        <a>
          <Button>
            <i className="bi bi-calendar-date"></i>
          </Button>
        </a>
      </Link>
      <Link href="/archives">
        <a>
          <Button>
            <i className="bi bi-archive"></i>
          </Button>
        </a>
      </Link>
    </Navbar>
  );
}

export default Footer;
