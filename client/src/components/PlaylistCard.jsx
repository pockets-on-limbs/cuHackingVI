const PlaylistCard = ({ playlist, handleClick }) => {
  return (
    <div className="playlist-card">
      {
        !playlist.images || playlist.images.length === 0
        ? <img src="/assets/cover1.png" alt="Default cover" className="playlist-cover" onClick={handleClick} />
        : <img src={playlist.images[0]?.url} alt={`${playlist.name} cover`} className="playlist-cover" onClick={handleClick}/>
      }
      <h2>{playlist.name}</h2>
      <span className='description'>{playlist.description.replaceAll("&#x27;", "'")}</span>
    </div>
  );
};

export default PlaylistCard;