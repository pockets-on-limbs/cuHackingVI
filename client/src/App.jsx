import { useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/Auth.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RateSongsPage } from "./pages/RateSongsPage.jsx";

function App() {
  const [login, setLogin] = useState(<p>Waiting</p>);
  useEffect(() => {
    setLogin(Auth());
  }, []);

  return (
    <>
      {login}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rating" element={<RateSongsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
