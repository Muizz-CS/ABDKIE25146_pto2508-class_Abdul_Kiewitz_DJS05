import { useState, useEffect, useMemo } from 'react';
import { PodcastContext } from './PodcastContext';
import { filterAndSortPodcasts } from '../utils/podcastHelpers';

const ITEMS_PER_PAGE = 12;

/**
 * PodcastProvider component managing global search, filtering, and pagination states.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements.
 * @returns {React.ReactElement} The rendered context provider.
 */
export const PodcastProvider = ({ children }) => {
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
    <PodcastContext.Provider
      value={{
        loading,
        error,
        searchQuery,
        selectedGenre,
        sortOrder,
        currentPage,
        paginatedPodcasts,
        totalPages,
        setSearchQuery: handleSearchChange,
        setSelectedGenre: handleGenreChange,
        setSortOrder,
        setCurrentPage,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};