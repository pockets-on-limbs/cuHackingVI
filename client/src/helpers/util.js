export function sendSpotifyRequest(url, method, data) {
  const options = { method, headers: new Headers() };
  options.headers.append("Content-Type", "application/json");
  options.body = JSON.stringify(data);
  const token = sessionStorage.getItem("access_token");
  if (token) {
    options.headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(url, options).then((res) => res.json());
}