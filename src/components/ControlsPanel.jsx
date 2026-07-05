/**
 * ControlsPanel component rendering search inputs, genre selectors, and sort mechanisms.
 * * @param {Object} props
 * @param {string} props.searchQuery - Current string query matching titles
 * @param {function} props.onSearchChange - Callback handler firing on text updates
 * @param {string} props.selectedGenre - Currently selected category filter ID
 * @param {function} props.onGenreChange - Callback handler processing menu adjustments
 * @param {string} props.sortOrder - Chosen alphabetical or chronological sort setting
 * @param {function} props.onSortChange - State updating handler function for sorting swaps
 * @param {Array<Object>} props.genresList - List of valid genre options available
 */
export const ControlsPanel = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  sortOrder,
  onSortChange,
  genresList
}) => {
  return (
    <section className="controls-panel" style={{ padding: '1.5rem 2rem', background: '#fff', margin: '1.5rem 2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ flex: '2', minWidth: '240px' }}>
        <label htmlFor="search-input" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Search Shows</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ flex: '1', minWidth: '180px' }}>
        <label htmlFor="genre-select" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Genre Filter</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', boxSizing: 'border-box' }}
        >
          <option value="">All Genres</option>
          {genresList.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.title}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: '1', minWidth: '180px' }}>
        <label htmlFor="sort-select" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Sort Sequence</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', boxSizing: 'border-box' }}
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="newest">Newest Updated</option>
          <option value="oldest">Oldest Updated</option>
        </select>
      </div>
    </section>
  );
};