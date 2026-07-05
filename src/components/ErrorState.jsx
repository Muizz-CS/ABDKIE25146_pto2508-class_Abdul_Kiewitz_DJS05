/**
 * ErrorState Component
 * Displays a clean fallback message if the fetch lifecycle encounters a network break.
 * @param {Object} props
 * @param {string} props.message - The technical catch statement.
 */
export const ErrorState = ({ message }) => (
  <div className="state-container error">
    <p>⚠️ Error: {message || "Failed to load podcasts. Please try again later."}</p>
  </div>
);