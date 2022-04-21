import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContact, getContactList } from 'redux/contactReducer';

export const Home = () => {
  const [list, setList] = useState([]);

  const contactList = useSelector(getContactList);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contactList));
    setList(contactList);
  }, [contactList]);

  const handlerChangeQuery = query => {
    query !== ''
      ? setList(
          contactList.filter(({ name }) => name.toLowerCase().includes(query))
        )
      : setList(contactList);
  };

  const handlerOnSubmit = e => {
    e.preventDefault();
    e.target[0].value = '';
  };

  return (
    <>
      <p>PHONE BOOK</p>
      <Link
        to="/edit"
        state={{
          title: 'Add contact',
          placeHolderName: 'Sebastian Pereiro',
          placeHolderEmail: 'vasiya@rus.net',
          placeHolderPhone: '000-000-0000',
        }}
      >
        Add contact...
      </Link>
      <form onSubmit={handlerOnSubmit}>
        <input
          type="text"
          onChange={e =>
            handlerChangeQuery(e.target.value.toLowerCase().trim())
          }
        />
        <button type="submit">Find</button>
      </form>
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
                to="edit"
                state={{
                  id: id,
                  title: 'Edit contact',
                  placeHolderName: name,
                  placeHolderEmail: email,
                  placeHolderPhone: phone,
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
