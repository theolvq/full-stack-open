import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const FilterForm = () => {
  const dispatch = useDispatch();

  const filterAnecdotes = e => {
    dispatch(filterChange(e.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <form style={style}>
      <label>
        Filter:
        <input onChange={filterAnecdotes} />
      </label>
    </form>
  );
};

export default FilterForm;
