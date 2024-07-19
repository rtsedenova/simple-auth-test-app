import { useState } from 'react';
import './Like.css';

const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <button className="like-button" onClick={handleClick}>
      <img
        src={liked ? 'images/like-filled.png' : 'images/like-outline.png'}
        alt="Like button"
        className="like-icon"
      />
    </button>
  );
};

export default LikeButton;