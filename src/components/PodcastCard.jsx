import { Link } from 'react-router-dom';
import { formatDate, getGenreNames } from '../utils/formatter';

/**
 * PodcastCard Component
 * Wraps the display in a Link to allow navigation to specific show details.
 */
const PodcastCard = ({ podcast }) => {
  const { id, title, image, seasons, genres, updated } = podcast;

  return (
    // Wrap the card in a Link component pointing to the show's specific ID
    <Link to={`/show/${id}`} className="podcast-card-link">
      <div className="podcast-card">
        <img src={image} alt={title} className="podcast-image" loading="lazy" />
        <div className="podcast-info">
          <h3>{title}</h3>
          <p className="seasons-count"><strong>Seasons:</strong> {seasons}</p>
          
          <div className="genre-tags">
            {getGenreNames(genres).map((genreName, index) => (
              <span key={index} className="tag">{genreName}</span>
            ))}
          </div>
          
          <small className="last-updated">
            <span>📅</span> {formatDate(updated)}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;