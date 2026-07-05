import 'react';
import { usePodcast } from '../context/PodcastContext';
import PodcastCard from '../components/PodcastCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ControlsPanel } from '../components/ControlsPanel';
import { Pagination } from '../components/Pagination';
import { genres } from '../utils/formatter';

export const Home = () => {
  const {
    loading,
    error,
    searchQuery,
    selectedGenre,
    sortOrder,
    currentPage,
    paginatedPodcasts,
    totalPages,
    setSearchQuery,
    setSelectedGenre,
    setSortOrder,
    setCurrentPage,
  } = usePodcast();

  return (
    <div>
      <ControlsPanel 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
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
    </div>
  );
};