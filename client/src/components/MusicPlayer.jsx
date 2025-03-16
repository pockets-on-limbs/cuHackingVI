import { useState, useRef, useEffect } from "react";
import "../styles/MusicPlayer.css";

function MusicPlayer({ audioUrl, onRate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = () => {
    setCurrentTime(duration); // Skip to the end of the song
    audioRef.current.currentTime = duration;
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleRate = (rating) => {
    onRate(rating);
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={audioUrl}></audio>
      <div className="controls">
        <button className="skip-btn" onClick={skipTrack}>
          ⏭
        </button>
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className="music-slider"
        />
      </div>
      <div className="rating-buttons">
        <button onClick={() => handleRate(1)} className="rate-btn">
          Rate 1
        </button>
        <button onClick={() => handleRate(5)} className="rate-btn">
          Rate 5
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
