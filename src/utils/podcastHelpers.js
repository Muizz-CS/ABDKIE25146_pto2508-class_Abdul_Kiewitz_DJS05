/**
 * Filters and sorts an array of podcasts based on search, genre, and sort order keys.
 * * @param {Array} podcasts - The raw master list of shows from the API
 * @param {string} search - The current text input query
 * @param {string} genre - The selected genre ID string
 * @param {string} sortOrder - The current sequencing key (A-Z, Z-A, NEWEST)
 * @returns {Array} The processed, filtered, and ordered dataset
 */
export const filterAndSortPodcasts = (podcasts, search, genre, sortOrder) => {
  let results = [...podcasts];

  if (search.trim() !== '') {
    const query = search.toLowerCase();
    results = results.filter((show) => 
      show.title?.toLowerCase().includes(query)
    );
  }

  if (genre !== '') {
    const genreId = Number(genre);
    results = results.filter((show) => 
      show.genres?.map(Number).includes(genreId)
    );
  }

  results.sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return (a.title || '').localeCompare(b.title || '');
    }
    if (sortOrder === 'Z-A') {
      return (b.title || '').localeCompare(b.title || '');
    }
    if (sortOrder === 'NEWEST') {
      return new Date(b.updated || 0) - new Date(a.updated || 0);
    }
    return 0;
  });

  return results;
};