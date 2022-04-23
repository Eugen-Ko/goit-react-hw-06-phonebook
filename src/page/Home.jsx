import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  changeQuery,
  deleteContact,
  getFilterQuery,
  getItemsList,
} from 'redux/dataSelector';

export const Home = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const contactList = useSelector(getItemsList);
  const filter = useSelector(getFilterQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    filter !== ''
      ? setList(
          contactList.filter(({ name }) => name.toLowerCase().includes(filter))
        )
      : setList(contactList);
  }, [contactList, filter]);

  useEffect(() => {}, [filter]);
  useEffect(() => {
    filter !== '' ? navigate(`?query=${filter}`) : navigate(`/`);
  }, [filter, navigate]);

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
