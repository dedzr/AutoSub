// src/App.js
import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

import GlobalStyle from "./styles/GlobalStyle";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./components/FIleUpload";

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <FileUpload />
            <ToastContainer />
        </>
    );
};

export default App;
