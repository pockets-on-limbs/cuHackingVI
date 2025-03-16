import { PlaylistCard } from "./PlaylistCard.jsx";

export function Card() {
  const playlists = [
    {
      id: "37i9dQZF1DXcBWIGoYBM5M",
      name: "Today's Top Hits",
      description: "The biggest songs of today.",
      owner: {
        id: "spotify",
        display_name: "Spotify",
      },
      tracks: {
        total: 50,
      },
      images: [
        {
          url: "https://i.scdn.co/image/ab67706f0000000277c5d82a4840f0d55e60b72d",
        },
      ],
      public: true,
    },
    {
      id: "37i9dQZF1DX0XUsuxWHRQd",
      name: "Chill Vibes",
      description: "Relax and unwind with chill music.",
      owner: {
        id: "spotify",
        display_name: "Spotify",
      },
      tracks: {
        total: 60,
      },
      images: [
        {
          url: "https://i.scdn.co/image/ab67706f000000026d4d875b8d6b17a2f4683ac5",
        },
      ],
      public: true,
    },
    {
      id: "37i9dQZF1DWXRqgorJj26U",
      name: "Rock Classics",
      description: "The greatest classic rock anthems.",
      owner: {
        id: "spotify",
        display_name: "Spotify",
      },
      tracks: {
        total: 75,
      },
      images: [
        {
          url: "https://i.scdn.co/image/ab67706f00000002e844e92718352b08454fda00",
        },
      ],
      public: true,
    },
    {
      id: "37i9dQZF1DX4JAvHpjipBk",
      name: "Lo-Fi Beats",
      description: "Chill beats to help you focus.",
      owner: {
        id: "spotify",
        display_name: "Spotify",
      },
      tracks: {
        total: 100,
      },
      images: [
        {
          url: "https://i.scdn.co/image/ab67706f00000002bbba5a37e3e9b650b0a8cf65",
        },
      ],
      public: true,
    },
  ];
  return (
    <div className="main-playlist-container">
      <h1>Playlists</h1>
      <div className="scroll-container">
        {playlists.map((p, i) => (
          <PlaylistCard title={p.name} />
        ))}
      </div>

      {/* <button onClick={() => setShowNextPage(true)}>Add</button> */}
    </div>
  );
}
