import { useState, useEffect, useMemo } from 'react';
import { PodcastContext } from './PodcastContext';

export const PodcastProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('a-z');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch initial data
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch podcast previews.');
        return res.json();
      })
      .then((data) => {
        setShows(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter and sort the collection
  const processedPodcasts = useMemo(() => {
    let results = [...shows];

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter((p) =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    if (selectedGenre) {
      const genreId = Number(selectedGenre);
      results = results.filter((p) => p.genres?.includes(genreId));
    }

    if (sortOrder === 'a-z') {
      results.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortOrder === 'z-a') {
      results.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    } else if (sortOrder === 'newest') {
      results.sort((a, b) => new Date(b.updated || 0) - new Date(a.updated || 0));
    } else if (sortOrder === 'oldest') {
      results.sort((a, b) => new Date(a.updated || 0) - new Date(b.updated || 0));
    }

    return results;
  }, [shows, searchQuery, selectedGenre, sortOrder]);

  const totalPages = Math.ceil(processedPodcasts.length / itemsPerPage) || 1;

  // Paginated slice
  const paginatedPodcasts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedPodcasts.slice(start, start + itemsPerPage);
  }, [processedPodcasts, currentPage]);

  // Handler functions to reset page index on filter change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleGenreChange = (val) => {
    setSelectedGenre(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val) => {
    setSortOrder(val);
    setCurrentPage(1);
  };

  return (
    <PodcastContext.Provider value={{
      loading,
      error,
      searchQuery,
      selectedGenre,
      sortOrder,
      currentPage,
      paginatedPodcasts,
      totalPages,
      setSearchQuery: handleSearchChange, // Exposed handler
      setSelectedGenre: handleGenreChange, // Exposed handler
      setSortOrder: handleSortChange, // Exposed handler
      setCurrentPage
    }}>
      {children}
    </PodcastContext.Provider>
  );
};