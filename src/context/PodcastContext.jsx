import { createContext, useContext } from 'react';

/**
 * Global context for storing podcast listing states.
 */
export const PodcastContext = createContext(null);

/**
 * Custom hook to consume the Podcast context safely.
 * @returns {Object} Context state values and setters.
 * @throws {Error} If used outside of a PodcastProvider.
 */
export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
};