import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
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
  if (!show) return <p>Show not found.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Shows
      </Link>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <img src={show.image} alt={show.title} style={{ width: '200px', borderRadius: '8px' }} />
        <div>
          <h2>{show.title}</h2>
          <p style={{ color: '#64748b', maxWidth: '600px' }}>{show.description}</p>
          <p><strong>Seasons:</strong> {show.seasons?.length}</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="season-select" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
          Select Season:
        </label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          {show.seasons?.map((season, index) => (
            <option key={season.season} value={index}>
              Season {season.season} ({season.episodes?.length} Episodes)
            </option>
          ))}
        </select>
      </div>

      <h3>Episodes</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {show.seasons?.[selectedSeason]?.episodes?.map((episode) => (
          <li
            key={episode.episode}
            style={{
              padding: '1rem',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: '500' }}>
                {episode.episode}. {episode.title}
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                {episode.description}
              </p>
            </div>
            <button style={{ padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};