import React, { useEffect, useState } from 'react';
import MusicPlayer from '../components/MusicPlayer';
import { createSong } from '../apiService.js';
import RecordButton from '../components/RecordButton';

const PlaylistCard = ({ playlist, handleClick }) => {
  return (
    <div className="playlist-card">
      {
        !playlist.images || playlist.images.length === 0 ? <img src="/assets/cover1.png" alt="Default cover" className="playlist-cover" onClick={handleClick} />
        : <img src={playlist.images[0]?.url} alt={`${playlist.name} cover`} className="playlist-cover" onClick={handleClick}/>
      }
      <h2>{playlist.name}</h2>
      <span className='description'>{playlist.description.replaceAll("&#x27;", "'")}</span>
    </div>
  );
};

const Home = ({ token }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched playlists:", data); // Debugging log
      setPlaylists(data.items);
    };

    fetchPlaylists();
  }, [token]);

  useEffect(() => {
    if (selectedPlaylist) {
      const fetchTracks = async () => {
        const response = await fetch(selectedPlaylist.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Fetched tracks:", data); // Debugging log
        setTracks(data.items);
        if (data.items.length > 0) {
          const tmp = data.items[0];
          setCurrentTrack({
            "image": tmp.track.album.images?.length > 0 ? tmp.track.album.images[0].url : "/assets/cover1.png",
            "songid": tmp.track.id,
            "songname": tmp.track.name,
            "artist": tmp.track.artists[0].name,
            "album": tmp.track.album.name,
            "index": 0
          });
        } else {
          alert("Selected playlist is empty");
        }

        data.items.map((track) => {
          createSong({
            "songid": track.track.id,
            "songname": track.track.name,
            "artist": track.track.artists[0].name,
            "album": track.track.album.name,
          }).then((data) => {
            console.log("Created song:", data); // Debugging log
          }).catch((error) => {
            console.error("Error creating song:", error); // Debugging log
          });
      })
      };

      fetchTracks();
    }
  }
  , [selectedPlaylist, token]);

  return (
    <div className='home-box'>
      <div className='home-top-container'>
        <img src="/assets/catdj.gif" className="catdj" alt="DJ Cat" />
        <div className="title"><span className="name"><span className="dj">DJ</span>enerate</span></div>
      </div>
      {
        currentTrack &&
        <div className='playlist-box'>
            <img src={currentTrack.image} alt={`${currentTrack.songname} cover`} className="playlist-cover-large"/>
            <div class="playlist-info">
            <h2>{currentTrack.songname}</h2>
            <div className='soundbar'>
              <button className="idk-btn" onClick={() => {
                const tmp = tracks[currentTrack.index - 1];
                setCurrentTrack({
                  "image": tmp.track.album.images?.length > 0 ? tmp.track.album.images[0].url : "/assets/cover1.png",
                  "songid": tmp.track.id,
                  "songname": tmp.track.name,
                  "artist": tmp.track.artists[0].name,
                  "album": tmp.track.album.name,
                  "index": currentTrack.index - 1
                });
              }} disabled={currentTrack.index - 1 < 0}>prev</button>
              <audio controls>
                  <source src="/audio/song.wav" type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
              <button  className="idk-btn" onClick={() => {
                const tmp = tracks[currentTrack.index + 1];
                setCurrentTrack({
                  "image": tmp.track.album.images?.length > 0 ? tmp.track.album.images[0].url : "/assets/cover1.png",
                  "songid": tmp.track.id,
                  "songname": tmp.track.name,
                  "artist": tmp.track.artists[0].name,
                  "album": tmp.track.album.name,
                  "index": currentTrack.index + 1
                });
              }} disabled={currentTrack.index + 1 >= tracks.length}>next</button>
            </div>
            <RecordButton songid={currentTrack.songid} />
            </div>
          <p onClick={() => {setSelectedPlaylist(null); setCurrentTrack(null); setTracks(null)}} className="close-btn">x</p>
        </div>
        }
        <div className={currentTrack ? 'home-container covered' : 'home-container'}>
          <h1 className='heading'>Your Playlists</h1>
          <div className="playlist-container">
            <div className="playlist-card">
              <div alt="Default cover" className="playlist-cover add-playlist" />
              <h2 className='djenerate-text'>DJenerate me a new playlist!</h2>
            </div>
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} handleClick={() =>{console.log(playlist); setSelectedPlaylist(playlist)}} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default Home;