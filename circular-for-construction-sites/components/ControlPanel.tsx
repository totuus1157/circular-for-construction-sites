import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, collectionGroup, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

type Props = { name: string; brand: string };

function ControlPanel(props: Props): JSX.Element {
  const { name, brand } = props;

  type From = { area: string; section: string };

  const fromData: From[] = [];
  const [fromArray, setFromArray] = useState<From[]>([]);
  const router = useRouter();

  console.log("fromArray: ", fromArray);

  useEffect((): void => {
    getDocs(collectionGroup(db, "articles")).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        fromData.push(doc.from);
      });
      setFromArray(fromData);
    });
  }, []);

  const areaDropdownItems = (fromArray: From[]) => {
    const hoge = [];
    hoge.push(
      fromArray.find((from: From) => {
        console.log("from: ", from);
        return from === { area: "a", section: "civil" };
      })
    );
    console.log("hoge: ", hoge);
  };

  areaDropdownItems(fromArray);

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>{brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            onSelect={(selectedKey) => {
              alert(`selected ${selectedKey}`);
            }}
          >
            <NavDropdown title="エリア" id="basic-nav-dropdown1">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>A</Accordion.Header>
                  <Accordion.Body>
                    <NavDropdown.Item>Civil</NavDropdown.Item>
                    <NavDropdown.Item>Building</NavDropdown.Item>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>B</Accordion.Header>
                  <Accordion.Body>
                    <NavDropdown.Item>Civil</NavDropdown.Item>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </NavDropdown>
          </Nav>
          {brand === "回覧板" && (
            <Button
              variant="outline-light"
              onClick={() => router.push("/newsPosts")}
            >
              書き込み
            </Button>
          )}
          {brand === "カレンダー" && (
            <Button
              variant="outline-light"
              onClick={() => router.push("/schedulePosts")}
            >
              予定登録
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ControlPanel;
