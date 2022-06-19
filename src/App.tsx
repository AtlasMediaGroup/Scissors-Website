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
                <Navbar.Brand className={"ms-5"} href={"/"}>SCISSORS</Navbar.Brand>
                <Nav className={"me-auto"}>
                    <NavLink href={"https://github.com/AtlasMediaGroup/Scissors"}>Source</NavLink>
                    <NavLink href={"https://status.scissors.gg"}>Status</NavLink>
                </Nav>
                <Button variant={"light"} className={"me-5 download-button"} href={"/downloads"} style={{borderRadius: "2vh"}}><img src={"https://cdn3.iconfinder.com/data/icons/download-buttons-outline-collection/70/Download-13-512.png"} width={"50px"} alt={"download"}/>  DOWNLOAD</Button>
            </Navbar>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/downloads"} element={<DownloadPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
