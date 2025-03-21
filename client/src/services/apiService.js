const url = 'http://api.djenerate.club';
export function createSong(song) {
  return fetch(`${url}/songs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(song)
  });
}

export function getSongById(songId) {
  return fetch(`${url}/songs/${songId}`, { method: 'GET' });
}

export function getSongs() {
  return fetch(`${url}/songs`, { method: 'GET' });
}

export function getRecommendations() {
  console.log(`${url}/recommendations`)
  return fetch(`${url}/recommendations`, { method: 'GET' }).then((res) => res.json());
}