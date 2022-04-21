import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  editContact,
  deleteContact,
  getContactList,
} from 'redux/contactReducer';

export const Home = () => {
  const contactList = useSelector(getContactList);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contactList));
    setList(contactList);
  }, [contactList]);

  const handlerChangeQuery = e => {
    e !== ''
      ? setList(
          contactList.filter(({ name }) => name.toLowerCase().includes(e))
        )
      : setList(contactList);
  };

  const handlerOnSubmit = e => {
    e.preventDefault();
    e.target[0].value = '';
  };

  console.log(list);
  return (
    <>
      <p>PHONE BOOK</p>
      <Link
        to="/edit"
        state={{
          title: 'Add contact',
          plaseHolderName: 'Sebastian Pereiro',
          plaseHolderEmail: 'vasiya@rus.net',
          plaseHolderPhone: '000-000-0000',
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
