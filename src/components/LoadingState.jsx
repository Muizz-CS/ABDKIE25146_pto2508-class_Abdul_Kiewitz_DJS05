/**
 * LoadingState Component
 * Displays a custom animated audio wave icon while data fetching is active.
 */
export const LoadingState = () => (
  <div className="state-container loading-view">
    {/* Simple CSS animation of audio wave bars to indicate loading */}
    <div className="audio-wave-icon" aria-label="Loading audio data">
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
      <span className="wave-bar"></span>
    </div>
    <p className="loading-text">Tuning in to the discovery network...</p>
  </div>
);