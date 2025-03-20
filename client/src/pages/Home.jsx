import React, { useEffect, useState } from 'react';
import RecordButton from '../components/RecordButton.jsx';
import PlaylistCard from '../components/PlaylistCard.jsx';
import { sendSpotifyRequest } from '../helpers/util.js';
import { createSong, getRecommendations } from '../services/apiService.js';


const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const storeCurrentTrack = (track, index = 0) => {
    setCurrentTrack({
      "image": track.album.images?.length > 0 ? track.album.images[0].url : "/assets/cover1.png",
      "songid": track.id,
      "songname": track.name,
      "artist": track.artists[0].name,
      "album": track.album.name,
      "index": index
    });
  }

  useEffect(() => {
    sendSpotifyRequest('https://api.spotify.com/v1/me/playlists', "GET").then((data) => {
      console.log("Fetched playlists:", data);
      setPlaylists(data.items);
      console.log("Fetched playlists:", data);
    })
  }, []);

  useEffect(() => {
    if (selectedPlaylist) {
      sendSpotifyRequest(selectedPlaylist.tracks.href, "GET").then((data) => {
        console.log("Fetched tracks:", data);
        setTracks(data.items.reduce((acc, item) => {
          acc.push(item.track); return acc;
        }, []));

        data.items.map((track) => {
          createSong({
            "songid": track.track.id,
            "songname": track.track.name,
            "artist": track.track.artists[0].name,
            "album": track.track.album.name,
          }).then((data) => {
            console.log("Created song:", data);
          }).catch((error) => {
            console.error("Error creating song:", error);
          });
        })
      })
    }
  }
  , [selectedPlaylist]);

  const resetState = () => {
    setSelectedPlaylist(null);
    setCurrentTrack(null);
    setTracks(null);
  }

  const beginJeneration = () => {
    getRecommendations().then(async (data) => {
      const loadSongs = async () => {
        const recommendations = []
        for(let i = 0; i < data.length; i++){
          const song = await sendSpotifyRequest(`https://api.spotify.com/v1/tracks/${data[i]}`, "GET")
          recommendations.push(song);
        }
        return recommendations
      }
      await loadSongs().then((songs) => setTracks(songs));
    })
  }

  useEffect(() => {
    if (!tracks) return;
    console.log("here", tracks)
    console.log(tracks.length)
    if (tracks.length > 0) {
      storeCurrentTrack(tracks[0]);
    } else {
      setCurrentTrack(null);
      alert("Selected playlist is empty");
    }
  }, [tracks]);


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
            <div className="playlist-info">
            <h2>{currentTrack.songname}</h2>
            <div className='soundbar'>
              <button className="idk-btn" onClick={() => {
                storeCurrentTrack(tracks[currentTrack.index - 1], currentTrack.index - 1);
              }} disabled={currentTrack.index - 1 < 0}>prev</button>
              <audio controls>
                  <source src="/audio/hate.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
              <button  className="idk-btn" onClick={() => {
                storeCurrentTrack(tracks[currentTrack.index + 1], currentTrack.index + 1);
              }} disabled={currentTrack.index + 1 >= tracks.length}>next</button>
            </div>
            <RecordButton songid={currentTrack.songid} />
            </div>
          <p onClick={resetState} className="close-btn">x</p>
        </div>
      }
        <div className={currentTrack ? 'home-container covered' : 'home-container'}>
          <h1 className='heading'>Your Playlists</h1>
          <div className="playlist-container">
            <div className="playlist-card">
              <div alt="Default cover" className="playlist-cover add-playlist" onClick={beginJeneration} />
              <h2 className='djenerate-text'>DJenerate me a new playlist!</h2>
            </div>
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} handleClick={() => setSelectedPlaylist(playlist)} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default Home;