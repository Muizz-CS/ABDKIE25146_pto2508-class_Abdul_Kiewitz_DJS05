import { useState, useEffect, useMemo } from 'react';
import { PodcastContext } from './PodcastContext';
import { filterAndSortPodcasts } from '../utils/podcastHelpers';

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('DEFAULT');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 10 : 15);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 768 ? 10 : 15);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
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

  const filteredAndSortedPodcasts = useMemo(() => {
    return filterAndSortPodcasts(podcasts, searchQuery, selectedGenre, sortOrder);
  }, [podcasts, searchQuery, selectedGenre, sortOrder]);

  const { paginatedPodcasts, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredAndSortedPodcasts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const slice = filteredAndSortedPodcasts.slice(startIndex, startIndex + itemsPerPage);
    return { paginatedPodcasts: slice, totalPages: total || 1 };
  }, [filteredAndSortedPodcasts, currentPage, itemsPerPage]);

  const updateSearchQuery = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const updateSelectedGenre = (val) => {
    setSelectedGenre(val);
    setCurrentPage(1);
  };

  const updateSortOrder = (val) => {
    setSortOrder(val);
    setCurrentPage(1);
  };

  return (
    <PodcastContext.Provider
      value={{
        podcasts,
        loading,
        error,
        searchQuery,
        selectedGenre,
        sortOrder,
        currentPage,
        paginatedPodcasts,
        totalPages,
        setSearchQuery: updateSearchQuery,
        setSelectedGenre: updateSelectedGenre,
        setSortOrder: updateSortOrder,
        setCurrentPage,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};