import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteContact, getItemsList } from 'redux/Reducers/itemsSlice';

export const Home = () => {
  const [list, setList] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const contactList = useSelector(getItemsList);
  const dispatch = useDispatch();

  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get('query')
      ? new URLSearchParams(location.search).get('query')
      : ''
  );

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contactList));
    setList(contactList);
  }, [contactList]);

  useEffect(() => {
    setList(
      contactList.filter(({ name }) => name.toLowerCase().includes(query))
    );
  }, [contactList, query]);

  const handleChange = el => {
    const queryValue = el.target.value.toLowerCase().trim();
    setQuery(queryValue);
    location.search = queryValue;
    location.search !== ''
      ? navigate(`?query=${location.search}`)
      : navigate(`/`);
  };

  return (
    <>
      <p>PHONE BOOK</p>
      <Link to="/edit">Add contact...</Link>
      {/* <form onSubmit={handlerOnSubmit}> */}
      <input
        type="text"
        defaultValue={`${query}`}
        onChange={handleChange}
        placeholder="Input search name..."
      />
      {/* <button type="submit">Find</button> */}
      {/* </form>  */}
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
