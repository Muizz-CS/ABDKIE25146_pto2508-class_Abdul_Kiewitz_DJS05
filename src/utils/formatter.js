/**
 * Static dictionary array matching genre IDs to their official presentation titles.
 * @type {Array<{id: number, title: string}>}
 */
export const genres = [
  { id: 1, title: "Personal Growth" },
  { id: 2, title: "Investigative Journalism" },
  { id: 3, title: "History" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Entertainment" },
  { id: 6, title: "Business" },
  { id: 7, title: "Fiction" },
  { id: 8, title: "News" },
  { id: 9, title: "Kids and Family" }
];

/**
 * Formats an ISO date string into a clean, human-readable format.
 * @param {string} dateStr - The ISO date string from the API.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "Date unknown";
  const date = new Date(dateStr);
  return `Updated ${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
};

/**
 * Static mapping of genre IDs to names based on the API framework context.
 * @param {number[]|string[]} genreIds - Array of genre IDs.
 * @returns {string[]} Array of matching genre titles.
 */
export const getGenreNames = (genreIds) => {
  if (!genreIds) return [];

  const ids = Array.isArray(genreIds) ? genreIds.map(Number) : genreIds.split(',').map(Number);

  return ids.map((id) => {
    const found = genres.find((g) => g.id === id);
    return found ? found.title : "Unknown";
  });
};