const url = 'http://localhost:8080';
export function createSong(song) {
  return fetch(`${url}/songs/`, {
      method: 'POST',
      body: JSON.stringify(song)
  });
}

export function getSongById(songId) {
  return fetch(`${url}/songs/${songId}`, 'GET');
}

export function getSongs() {
  return fetch(`${url}/songs`, 'GET');
}

export function getRecommendations() {
  return fetch(`${url}/recommendations`, 'GET');
}