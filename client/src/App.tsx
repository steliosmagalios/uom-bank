import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/home";
import ManagePage from "./screens/manage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/manage" element={<ManagePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
