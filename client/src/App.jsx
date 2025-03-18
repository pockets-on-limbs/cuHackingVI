import { useState, useEffect } from "react";
import "./App.css";
import { generateCodeChallengeAndVerifier, authenticate, getToken } from "./helpers/auth";
import Home from "./pages/Home";

function App() {
  const [access, setAccess] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (localStorage.getItem("code_verifier") === null) {
      generateCodeChallengeAndVerifier();
    } 
    if (urlParams.has("code") || localStorage.getItem("access_token") !== null) {
      let code = urlParams.get("code");
      localStorage.setItem("code", code);

      getToken(code).then((token) => {
        if (token) {
          localStorage.setItem("access_token", token);
          setAccess(token);
        }
      });

      urlParams.delete("code");
      window.history.replaceState("null", "", window.location.pathname);
    } else {
      setAccess(null);
    }
  }, []);

    return <div className="outer-box">
        {
            access ? <>
                <button onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("code");
                    localStorage.removeItem("code_verifier");
                    setAccess(null);
                }} className="back-btn">Disconnect from Spotify</button>
                <Home token={access}/>
            </>
            : <>
                <img src="/assets/catdj.gif" className="catdj"></img>
                <div className="title">Welcome to <span className="name"><span className="dj">DJ</span>enerate</span></div>
                <div className="subtitle">Craft your perfect playlist with Spotify recommendations and voice feedback!</div>
                <button className="action-btn" onClick={authenticate}>Connect to Spotify</button>
            </>
        }
    </div>;
}

export default App;
