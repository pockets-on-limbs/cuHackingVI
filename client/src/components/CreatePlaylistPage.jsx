import React from "react";
import "../styles/CreatePlaylistPage.css";
import { useState } from "react";
import { RateSongsPage } from "./RateSongsPage.jsx";
import { Card } from "../components/Card.jsx";

export function CreatePlaylistPage() {
  const [showNextPage, setShowNextPage] = useState(false);

  return (
    <div className="mainpage">
      {showNextPage ? (
        <RateSongsPage />
      ) : (
        <>
          <Card />
        </>
      )}
    </div>
  );
}
