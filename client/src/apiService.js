// Create a new song
const url = 'http://localhost:8080';
export function createSong(song) {
  return fetch(`${url}/songs/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(song)
  });
}

// Get a song by ID
export function getSongById(songId) {
  return fetch(`${url}/songs/${songId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });
}

// Get all songs with optional pagination
export function getSongs(skip = 0, limit = 100) {
  return fetch(`${url}/songs/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });
}