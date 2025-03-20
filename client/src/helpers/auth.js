const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=+$/, '')
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const generateCodeChallengeAndVerifier = async() => {
  if (sessionStorage.getItem("code_verifier") !== null) {
    return
  }
  const codeVerifier = generateRandomString(64);
  sessionStorage.setItem("code_verifier", codeVerifier);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  sessionStorage.setItem("code_challenge", codeChallenge);
}

export const authenticate = async () => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const codeChallenge = sessionStorage.getItem("code_challenge");

  const params = {
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    scope: "playlist-read-private",
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

export const getToken = async (code) => {
  if(sessionStorage.getItem("access_token") !== null){
    return
  }
  const codeVerifier = sessionStorage.getItem("code_verifier");
  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };

  return fetch(url, payload)
    .then((body) => body.json())
    .then((response) => {
      return response.access_token;
    });

};