const Search = ({ search, handleChange }) => {
  return (
    <form>
      <label>
        Search for countries: <input value={search} onChange={handleChange} />
      </label>
    </form>
  );
};

export default Search;
