import { useState, useEffect } from "react";
import "./App.css";
import { Auth, getToken } from "./authentication/Auth.jsx";
import { CreatePlaylistPage } from "./pages/CreatePlaylistPage.jsx";

function App() {
  const [login, setLogin] = useState(null);
  const [access, setAccess] = useState(sessionStorage.getItem("access_token"));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("code")) {
      let code = urlParams.get("code");
      sessionStorage.setItem("code", code);

      getToken(code).then((token) => {
        if (token) {
          sessionStorage.setItem("access_token", token);
          setAccess(true);
        }
      });

      urlParams.delete("code");
      window.history.replaceState("null", "", window.location.pathname);
    } else {
      setLogin(Auth());
    }
  }, []);

  return access ? <CreatePlaylistPage /> : login;
}

export default App;
