import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editContact,
  deleteContact,
  getContactList,
} from 'redux/contactReducer';

export const Home = () => {
  const contactList = useSelector(getContactList);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contactList));
  }, [contactList]);

  return (
    <>
      <ul>
        {contactList.map(({ id, name, email, phone }) => {
          return (
            <li key={id}>
              <div>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
              </div>
              <button type="button" onClick={() => dispatch(editContact(id))}>
                Edit
              </button>

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
