import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Button, Nav, Navbar, NavLink, NavDropdown, Container } from "react-bootstrap";

import "./css/App.css"
import DownloadPage from "./pages/DownloadPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar variant="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand className={"ms-5"} href={"/"}>Scissors</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Navbar.Collapse id="navbar-dark-example">
                        <Nav className={"me-auto"}>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Source"
                                menuVariant="dark">
                                <NavDropdown.Item href="https://github.com/AtlasMediaGroup/Scissors">Scissors</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/AtlasMediaGroup/Scissors-Website">Website</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://git.telesphoreo.me/AtlasMediaGroup/Scissors">Scissors (Mirror)</NavDropdown.Item>
                                <NavDropdown.Item href="https://git.telesphoreo.me/AtlasMediaGroup/Scissors-Website">Website (Mirror)</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Javadocs"
                                menuVariant="dark">
                                <NavDropdown.Item href="https://scissors.gg/javadoc/1.19.1">1.19.1</NavDropdown.Item>
                                <NavDropdown.Item href="https://scissors.gg/javadoc/1.18.2">1.18.2</NavDropdown.Item>
                                <NavDropdown.Item href="https://scissors.gg/javadoc/1.17.1">1.17.1</NavDropdown.Item>
                            </NavDropdown>

                            <NavLink href={"https://status.scissors.gg"}>Status</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Button variant={"primary"} className={"me-5 download-button"} href={"/downloads"} style={{ borderRadius: "2vh" }}><img src={"download-icon.png"} width={"25px"} alt={"download"} />  Download</Button>
                </Container>
            </Navbar>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/downloads"} element={<DownloadPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
