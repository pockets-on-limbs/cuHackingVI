import { useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/Auth.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";

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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
