import React, { useEffect, useState } from 'react';
import MusicPlayer from '../components/MusicPlayer';



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
        selectedPlaylist &&
        <div className='playlist-box'>
            {
            !selectedPlaylist.images || selectedPlaylist.images.length === 0 ? <img src="/assets/cover1.png" alt="Default cover" className="playlist-cover-large" />
            : <img src={selectedPlaylist.images[0]?.url} alt={`${selectedPlaylist.name} cover`} className="playlist-cover-large"/>
          }
          <MusicPlayer playlist={selectedPlaylist} token={token} />
          <p onClick={() => setSelectedPlaylist(null)} className="close-btn">x</p>
        </div>
        }
        <div className={selectedPlaylist ? 'home-container covered' : 'home-container'}>
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