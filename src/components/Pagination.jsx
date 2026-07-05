/**
 * Pagination component handling dynamic view offsets and page changing indices.
 * * @param {Object} props
 * @param {number} props.currentPage - Active visible view window index
 * @param {number} props.totalPages - Mathematical ceiling limit of chunks calculated
 * @param {function} props.onPageChange - Handler processing incremental button jumps
 */
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Pagination Navigation" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem', marginBottom: '3rem' }}>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: currentPage === 1 ? '#e2e8f0' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '500' }}
      >
        Previous
      </button>
      <span style={{ color: '#475569', fontWeight: '600' }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: currentPage === totalPages ? '#e2e8f0' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '500' }}
      >
        Next
      </button>
    </nav>
  );
};