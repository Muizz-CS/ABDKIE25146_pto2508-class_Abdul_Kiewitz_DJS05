import { createContext, useContext } from 'react';

export const PodcastContext = createContext(undefined);

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) throw new Error('usePodcast must be used within a PodcastProvider');
  return context;
};