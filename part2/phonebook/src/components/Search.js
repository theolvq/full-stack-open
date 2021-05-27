const Search = ({ filterInput, handleFilterChange }) => {
  return (
    <label>
      filter shown with{' '}
      <input value={filterInput} onChange={handleFilterChange} />
    </label>
  );
};

export default Search;
