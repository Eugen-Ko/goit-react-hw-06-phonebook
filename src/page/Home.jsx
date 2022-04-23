import { Link } from 'react-router-dom';
import { changeQuery, deleteContact } from 'redux/dataSelector';
import { useDispatch } from 'react-redux';
import { useHomeHook } from 'hooks/Hooks';

export const Home = () => {
  const dispatch = useDispatch();
  const { filter, list } = useHomeHook();

  return (
    <>
      <p>PHONE BOOK</p>
      <Link to="/edit">Add contact...</Link>
      <input
        type="text"
        defaultValue={`${filter}`}
        onChange={e => {
          dispatch(changeQuery(e.target.value.toLowerCase().trim()));
        }}
        placeholder="Input search name..."
      />
      <ul>
        {list.map(({ id, name, email, phone }) => {
          return (
            <li key={id}>
              <div>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
              </div>
              <Link
                to={`edit/${id}`}
                state={{
                  id: id,
                }}
              >
                Edit
              </Link>

              <button type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
