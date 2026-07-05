import { useState, useEffect, useMemo } from 'react';
import PodcastCard from './components/PodcastCard';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ControlsPanel } from './components/ControlsPanel';
import { Pagination } from './components/Pagination';
import { genres } from './utils/formatter'; 
import { filterAndSortPodcasts } from './utils/podcastHelpers';

const ITEMS_PER_PAGE = 12;

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleGenreChange = (val) => {
    setSelectedGenre(val);
    setCurrentPage(1);
  };

  const filteredAndSortedPodcasts = useMemo(() => {
    return filterAndSortPodcasts(podcasts, searchQuery, selectedGenre, sortOrder);
  }, [podcasts, searchQuery, selectedGenre, sortOrder]);

  const { paginatedPodcasts, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredAndSortedPodcasts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const slice = filteredAndSortedPodcasts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return {
      paginatedPodcasts: slice,
      totalPages: total || 1,
    };
  }, [filteredAndSortedPodcasts, currentPage]);

  return (
    <>
      <header>
        <h1>Podcast Discovery App</h1>
      </header>

      <main>
        <ControlsPanel 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          genresList={genres}
        />

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        
        {!loading && !error && paginatedPodcasts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No podcasts match your filters.</p>
          </div>
        )}

        {!loading && !error && paginatedPodcasts.length > 0 && (
          <>
            <section id="podcast-grid" className="grid-container">
              {paginatedPodcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </section>

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;