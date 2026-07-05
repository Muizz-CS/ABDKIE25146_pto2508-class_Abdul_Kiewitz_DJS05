import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

/**
 * Mapping of API genre IDs to their respective display titles.
 * @type {Record<number, string>}
 */
const GENRE_MAPPING = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

/**
 * ShowDetail Component
 * Fetches and displays comprehensive information about a specific podcast show,
 * including its title, description, genre tags, formatted updated date, and seasons.
 * * @returns {React.ReactElement} The rendered show detail page.
 */
export const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    /**
     * Asynchronously fetches show data from the API endpoint using the route ID parameter.
     */
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) throw new Error(`Failed to load show: ${response.status}`);
        const data = await response.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShowDetails();
  }, [id]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!show) return <p style={{ padding: '2rem', textAlign: 'center' }}>Show not found.</p>;

  // Format the last updated date to a readable string format
  const formattedDate = show.updated 
    ? new Date(show.updated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  const currentSeasonData = show.seasons?.[selectedSeason];

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem', textDecoration: 'none', color: '#2563eb', fontWeight: '500' }}>
        ← Back to Homepage
      </Link>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <img 
          src={show.image} 
          alt={show.title} 
          style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
        />
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{show.title}</h2>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {show.genres?.map((genreId) => (
              <span 
                key={genreId} 
                style={{ background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '500' }}
              >
                {GENRE_MAPPING[genreId] || `Genre ${genreId}`}
              </span>
            ))}
          </div>

          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <strong>Last Updated:</strong> {formattedDate}
          </p>

          <p style={{ color: '#334155', lineHeight: '1.6', maxWidth: '800px' }}>{show.description}</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem', marginBottom: '1.5rem' }}>
        <label htmlFor="season-navigation" style={{ marginRight: '1rem', fontWeight: '600', color: '#1e293b' }}>
          Select Season:
        </label>
        <select
          id="season-navigation"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '1rem', cursor: 'pointer' }}
        >
          {show.seasons?.map((season, index) => (
            <option key={season.season} value={index}>
              Season {season.season} ({season.episodes?.length || 0} Episodes)
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        {currentSeasonData?.image && (
          <img 
            src={currentSeasonData.image} 
            alt={`Season ${currentSeasonData.season}`} 
            style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} 
          />
        )}
        <h3 style={{ margin: 0 }}>
          Season {currentSeasonData?.season || selectedSeason + 1} Episodes
        </h3>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {currentSeasonData?.episodes?.map((episode) => (
          <li
            key={episode.episode}
            style={{
              padding: '1.25rem 0',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>
                {episode.episode}. {episode.title}
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', maxWidth: '900px' }}>
              {episode.description.length > 180 
                ? `${episode.description.substring(0, 180)}...` 
                : episode.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};