import React, { useState } from "react";
import MusicPlayer from "../components/MusicPlayer.jsx";
import "../styles/RateSongsPage.css";
import RecordButton from "../components/RecordButton.jsx";

export function RateSongsPage() {
  const [songsRated, setSongsRated] = useState(0); // For tracking rated songs
  const [songDetails, setSongDetails] = useState({
    image: "https://via.placeholder.com/150", // Placeholder image
    title: "Song Title",
    artist: "Artist Name",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder audio
  });

  const handleRating = (rating) => {
    setSongsRated(songsRated + 1);
    // You can handle saving the rating data to state or a backend here
    console.log(`Rated song: ${rating}`);
  };

  return (
    <div className="rate-songs-page">
      <div className="songs-rated">
        <h3>Songs Rated: {songsRated}</h3>
      </div>
      <div className="song-details">
        <img src={songDetails.image} alt={songDetails.title} />
        <div className="song-info">
          <h2>{songDetails.title}</h2>
          <p>{songDetails.artist}</p>
        </div>
      </div>
      <MusicPlayer audioUrl={songDetails.audioUrl} onRate={handleRating} />
      <RecordButton />
    </div>
  );
}
