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

type Props = {
  brand: string;
  setSelectedAreaAndSection: (arg0: string) => void;
};

function ControlPanel(props: Props): JSX.Element {
  const { brand, setSelectedAreaAndSection } = props;

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
            onSelect={(selectedKey): void => {
              selectedKey && setSelectedAreaAndSection(selectedKey);
            }}
          >
            <NavDropdown title="エリア選択" id="basic-nav-dropdown1">
              <NavDropdown.Item eventKey="all">すべて</NavDropdown.Item>
              <NavDropdown.Divider />
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>A</Accordion.Header>
                  <Accordion.Body>
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "a" && obj.section === "civil"
                    ) && (
                      <NavDropdown.Item eventKey="a,civil">
                        Civil
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "a" && obj.section === "building"
                    ) && (
                      <NavDropdown.Item eventKey="a,building">
                        Building
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "a" && obj.section === "mechanical"
                    ) && (
                      <NavDropdown.Item eventKey="a,mechanical">
                        Mechanical
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "a" && obj.section === "piping"
                    ) && (
                      <NavDropdown.Item eventKey="a,piping">
                        Piping
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "a" && obj.section === "erectrical"
                    ) && (
                      <NavDropdown.Item eventKey="a,erectrical">
                        Erectrical
                      </NavDropdown.Item>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>B</Accordion.Header>
                  <Accordion.Body>
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "b" && obj.section === "civil"
                    ) && (
                      <NavDropdown.Item eventKey="b,civil">
                        Civil
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "b" && obj.section === "building"
                    ) && (
                      <NavDropdown.Item eventKey="b,building">
                        Building
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "b" && obj.section === "mechanical"
                    ) && (
                      <NavDropdown.Item eventKey="b,mechanical">
                        Mechanical
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "b" && obj.section === "piping"
                    ) && (
                      <NavDropdown.Item eventKey="b,piping">
                        Piping
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "b" && obj.section === "erectrical"
                    ) && (
                      <NavDropdown.Item eventKey="b,erectrical">
                        Erectrical
                      </NavDropdown.Item>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>C</Accordion.Header>
                  <Accordion.Body>
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "c" && obj.section === "civil"
                    ) && (
                      <NavDropdown.Item eventKey="c,civil">
                        Civil
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "c" && obj.section === "building"
                    ) && (
                      <NavDropdown.Item eventKey="c,building">
                        Building
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "c" && obj.section === "mechanical"
                    ) && (
                      <NavDropdown.Item eventKey="c,mechanical">
                        Mechanical
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "c" && obj.section === "piping"
                    ) && (
                      <NavDropdown.Item eventKey="c,piping">
                        Piping
                      </NavDropdown.Item>
                    )}
                    {uniqueAreaAndSection.some(
                      (obj) => obj.area === "c" && obj.section === "erectrical"
                    ) && (
                      <NavDropdown.Item eventKey="c,erectrical">
                        Erectrical
                      </NavDropdown.Item>
                    )}
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
