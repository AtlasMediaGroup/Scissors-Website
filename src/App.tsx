import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Button, Nav, Navbar, NavLink } from "react-bootstrap";

import "./css/App.css"
import DownloadPage from "./pages/DownloadPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar bg={"dark"} variant={"dark"}>
                <Navbar.Brand className={"ms-5"} href={"/"}>Scissors</Navbar.Brand>
                <Nav className={"me-auto"}>
                    <NavLink href={"https://github.com/AtlasMediaGroup/Scissors"}>Source</NavLink>
                    <NavLink href={"https://status.scissors.gg"}>Status</NavLink>
                </Nav>
                <Button variant={"primary"} className={"me-5 download-button"} href={"/downloads"} style={{ borderRadius: "2vh" }}><img src={"download-icon.png"} width={"25px"} alt={"download"} />  Download</Button>
            </Navbar>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/downloads"} element={<DownloadPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
