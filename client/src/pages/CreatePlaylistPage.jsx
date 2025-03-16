import React from "react";
import "../styles/CreatePlaylistPage.css";
import { useState } from "react";
import { RateSongsPage } from "./RateSongsPage.jsx";

export function CreatePlaylistPage() {
  const [showNextPage, setShowNextPage] = useState(false);

  return (
    <div className="mainpage">
      {showNextPage ? (
        <RateSongsPage />
      ) : (
        <>
          <h2>Spotify Clone</h2>
          <button onClick={() => setShowNextPage(true)}>Next Page</button>
        </>
      )}
    </div>
  );
}
