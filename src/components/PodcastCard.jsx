import { formatDate, getGenreNames } from '../utils/formatter';

/**
 * PodcastCard Component
 * Displays an individual podcast preview item within the main application grid.
 * @param {Object} props
 * @param {Object} props.podcast - The core data structure returned by the API.
 */
const PodcastCard = ({ podcast }) => {
  const { title, image, seasons, genres, updated } = podcast;

  return (
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
  );
};

export default PodcastCard;