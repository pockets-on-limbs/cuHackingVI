import React from "react";
import "./MainPage.css";
import { NextPage } from "./NextPage.jsx";
import { useState } from "react";

export function MainPage() {
  const [showNextPage, setShowNextPage] = useState(false);

  return (
    <div className="mainpage">
      {showNextPage ? (
        <NextPage />
      ) : (
        <>
          <h2>Spotify Clone</h2>
          <button onClick={() => setShowNextPage(true)}>Next Page</button>
        </>
      )}
    </div>
  );
}
