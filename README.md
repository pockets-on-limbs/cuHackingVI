# 🎵 DJenerate - AI-Powered Music Discovery

## 💡 Inspiration
Ever wished for a music app that truly understands your taste, without you having to tediously curate playlists? **DJenerate** is an AI-driven, speech-recognizing music recommender that learns in real-time based on your feedback. The more you rate songs, the smarter it gets!

---

## 🚀 What It Does

- 🎧 **AI-Powered Song Recommendations** – DJenerate refines its suggestions in real time as you rate songs, ensuring every track fits your vibe.
- 🗣️ **Voice-Controlled Music Discovery** – No more manual inputs! Simply speak to **Gemini AI** to express how you feel about a song, and DJenerate will fine-tune recommendations accordingly.
- ⚡ **Seamless Spotify Integration** – Instantly fetch your playlists, play songs, and curate new ones—all within your existing Spotify account.

---

## 🛠️ How We Built It

- 🎨 **Frontend:** Built with **React** and **CSS** for an immersive music discovery experience.
- 🔑 **Authentication & Data:**
  - **OAuth** for secure login.
  - **Gemini AI** to understand speech-based feedback.
  - **Spotify & YouTube APIs** to fetch tracks and create dynamic playlists.

---

## 🤯 Challenges We Faced

- 🔄 **Spotify API Deprecation** – A last-minute pivot was needed due to a crucial API deprecation, but we successfully adapted under pressure.
- 🎙️ **Speech-to-Preferences Mapping** – Fine-tuning **Gemini AI** to understand user feedback and map emotions to song recommendations.
- 🎛️ **AI Learning Balance** – Preventing the model from overfitting and ensuring adaptive, diverse recommendations.
- 🔗 **Multi-API Integration** – Handling authentication and syncing data across Spotify, YouTube, and Gemini efficiently.

---

## 🚀 What’s Next?

- 🗣️ **Emotion-Based Song Selection** – Detect emotions from speech to suggest mood-based tracks.
- 📊 **Music Taste Analytics** – Provide users with insights into their listening habits and evolving preferences.
- 🎶 **More Platform Integrations** – Expanding beyond Spotify and YouTube for a richer experience.

🎵 Why settle for generic playlists when your music experience can evolve with you? Let’s **DJenerate**! 🚀🔥

---

## 🛠️ Local Development

### Developing locally - client
```
cd client
npm i
npm run dev
```

### Developing locally - server
```
cd server
docker compose build
docker compose up -d
```

## 🔗 Connect With Us
🚀 Ready to revolutionize music discovery? Join us on this journey!

