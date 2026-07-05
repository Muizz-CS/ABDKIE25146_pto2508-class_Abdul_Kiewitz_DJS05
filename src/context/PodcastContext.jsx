import { createContext, useContext } from 'react';

/**
 * Global context instance for sharing podcast states.
 */
export const PodcastContext = createContext(null);

/**
 * Custom hook to safely consume the global podcast context framework.
 * @returns {Object} Global podcast states and filter functions.
 */
export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
};