import { useState, useEffect } from "react";
import "./App.css";
import { generateCodeChallengeAndVerifier, authenticate, getToken } from "./helpers/auth";
import Home from "./pages/Home";

function App() {
  const [access, setAccess] = useState(sessionStorage.getItem("access_token"));

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("code_challenge");
    sessionStorage.removeItem("code_verifier");
    generateCodeChallengeAndVerifier();
    setAccess(null);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const getCodeChallengeAndVerifier = async () => {
        await generateCodeChallengeAndVerifier();
    }
    const checkAccess = () => {
      let code = urlParams.get("code");
      let token = sessionStorage.getItem('access_token')
      if (code || token !== null) {
        if(code){
          getToken(code).then((token) => {
            if (token) {
              sessionStorage.setItem("access_token", token);
              setAccess(token);
              urlParams.delete("code");
              window.history.replaceState("null", "", window.location.pathname);
            }
          });
        } else {
          setAccess(token);
          // TODO: verify whether token is still valid
        }
      } else {
        setAccess(null);
      }
    }
    getCodeChallengeAndVerifier().then(checkAccess);

  }, []);

    return <div className="outer-box">
        {
            access ? <>
                <button onClick={logout} className="back-btn">Disconnect from Spotify</button>
                <Home />
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