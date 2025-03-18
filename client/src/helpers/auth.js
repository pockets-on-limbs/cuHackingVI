const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

async function sha256(plain) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)

  return window.crypto.subtle.digest('SHA-256', data)
}

function base64urlencode(a){
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''))
}


export const authenticate = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64urlencode(hashed)

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  localStorage.setItem("code_verifier", codeVerifier);

  console.log(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
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
  const codeVerifier = localStorage.getItem("code_verifier");

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
      console.log("Token response:", response);
      return response.access_token;
    });

};
