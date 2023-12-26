import React from "react";
import "./App.css";
import Button from "./Compotants/button/Button";
import { HashRouter, Routes, Route } from "react-router-dom";
import { IoMoonOutline } from "react-icons/io5";
import Header from "./Compotants/header/Header";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import NotFound from "./pages/pageNotFound/PageNotFound";
import "bootstrap/dist/css/bootstrap.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTheme } from "../src/services/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <DndProvider backend={HTML5Backend}>
      <ToastContainer />
      <Header>
        <h1 className="m-0">Where in the world?</h1>
        <Button
          buttonClassName={"dark-mode-button d-flex"}
          icon={<IoMoonOutline />}
          text="Dark Mode"
          action={toggleDarkMode}
          iconStyle={"icon-style"}
        />
      </Header>

      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryName" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </DndProvider>
  );
};

export default App;
