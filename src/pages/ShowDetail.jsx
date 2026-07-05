import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

// Maps genre IDs from the API to readable titles
const GENRE_MAP = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family"
};

export const ShowDetail = () => {
  const { id } = useParams();
  
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [prevId, setPrevId] = useState(id);

  // Reset page state immediately if the user switches to a different show ID
  if (id !== prevId) {
    setPrevId(id);
    setLoading(true);
    setShow(null);
    setSelectedSeason(0);
    setError(null);
  }

  // Fetch show details whenever the ID changes
  useEffect(() => {
    let isCurrentRequest = true;

    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load details for this podcast show.');
        return res.json();
      })
      .then((data) => {
        if (isCurrentRequest) {
          setShow(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isCurrentRequest) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Ignore results if the user leaves the page before the fetch finishes
    return () => {
      isCurrentRequest = false;
    };
  }, [id]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!show) return <div style={{ padding: '40px', textAlign: 'center' }}>Show not found.</div>;

  const formattedDate = new Date(show.updated).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const currentSeasonData = show.seasons[selectedSeason] || null;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', fontWeight: '500', color: '#0066cc', textDecoration: 'none' }}>
        ← Back to Browse
      </Link>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <img 
          src={show.image} 
          alt={show.title} 
          style={{ width: '200px', height: '200px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
        />
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem' }}>{show.title}</h1>
          <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '0.95rem' }}>
            <strong>Last Updated:</strong> {formattedDate}
          </p>
          
          <div style={{ margin: '0 0 16px 0', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {show.genres?.map((genreId) => (
              <span 
                key={genreId} 
                style={{ background: '#e2e8f0', color: '#4a5568', padding: '4px 10px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: '500' }}
              >
                {GENRE_MAP[genreId] || 'General'}
              </span>
            ))}
          </div>
          
          <p style={{ lineHeight: '1.6', color: '#2d3748', margin: '0' }}>{show.description}</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <label htmlFor="season-select" style={{ fontWeight: '600', color: '#1a202c' }}>
            Browse Seasons:
          </label>
          <select 
            id="season-select" 
            value={selectedSeason} 
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            style={{ padding: '8px 16px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
          >
            {show.seasons.map((season, index) => (
              <option key={season.season || index} value={index}>
                {season.title || `Season ${index + 1}`} ({season.episodes?.length || 0} Episodes)
              </option>
            ))}
          </select>
        </div>

        {currentSeasonData ? (
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
              <img 
                src={currentSeasonData.image || show.image} 
                alt={currentSeasonData.title} 
                style={{ width: '64px', height: '64px', borderRadius: '6px', objectFit: 'cover' }} 
              />
              <h2 style={{ margin: '0', fontSize: '1.4rem', color: '#1a202c' }}>{currentSeasonData.title}</h2>
            </div>

            {currentSeasonData.episodes?.length > 0 ? (
              currentSeasonData.episodes.map((episode, idx) => (
                <div 
                  key={episode.episode || idx} 
                  style={{ padding: '16px 0', borderBottom: idx === currentSeasonData.episodes.length - 1 ? 'none' : '1px solid #e2e8f0' }}
                >
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#2d3748' }}>
                    {episode.episode || (idx + 1)}. {episode.title}
                  </h4>
                  <p style={{ color: '#718096', fontSize: '0.9rem', margin: '0', lineHeight: '1.5' }}>
                    {episode.description 
                      ? (episode.description.length > 150 ? `${episode.description.substring(0, 150)}...` : episode.description) 
                      : 'No description provided for this episode.'}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#718096', padding: '12px 0' }}>No episodes available in this season.</p>
            )}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#718096' }}>Select a season to view its episodes.</p>
        )}
      </div>

    </div>
  );
};