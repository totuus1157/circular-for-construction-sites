import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

type Props = { brand: string };

function ControlPanel(props: Props): JSX.Element {
  const { brand } = props;

  type AreaAndSection = { area: string; section: string };

  const areaAndSectionData: AreaAndSection[] = [];
  const [areaAndSectionArray, setAreaAndSectionArray] = useState<
    AreaAndSection[]
  >([]);
  const router = useRouter();

  useEffect((): void => {
    getDocs(collectionGroup(db, "articles")).then((snapshot): void => {
      snapshot.forEach((document): void => {
        const doc = document.data();
        if (brand === "回覧板" || brand === "アーカイブ")
          areaAndSectionData.push(doc.to);
        if (brand === "カレンダー") areaAndSectionData.push(doc.from);
      });
      setAreaAndSectionArray(areaAndSectionData);
    });
  }, []);

  const areaArray = ["a", "b", "c"];
  const sectionArray = [
    "civil",
    "building",
    "mechanical",
    "piping",
    "erectrical",
  ];
  const sortedAreaAndSection: AreaAndSection[] = [];

  areaArray.forEach((area): void => {
    sectionArray.forEach((section): void => {
      areaAndSectionArray.forEach((obj): void => {
        if (area === obj.area && section === obj.section)
          sortedAreaAndSection.push(obj);
      });
    });
  });

  const uniqueAreaAndSection = sortedAreaAndSection.filter(
    (element, index, self): boolean => {
      return (
        index ===
        self.findIndex((e): boolean => {
          return e.area === element.area && e.section === element.section;
        })
      );
    }
  );

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
            <NavDropdown title="エリア選択" id="basic-nav-dropdown1">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>A</Accordion.Header>
                  <Accordion.Body>
                    <NavDropdown.Item eventKey="4.1">Civil</NavDropdown.Item>
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
              onClick={(): Promise<boolean> => router.push("/newsPosts")}
            >
              書き込み
            </Button>
          )}
          {brand === "カレンダー" && (
            <Button
              variant="outline-light"
              onClick={(): Promise<boolean> => router.push("/schedulePosts")}
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
