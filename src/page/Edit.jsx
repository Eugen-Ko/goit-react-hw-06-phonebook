import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, editContact, getContactList } from 'redux/contactReducer';
import { useNavigate, useLocation } from 'react-router-dom';

export const Edit = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(getContactList);
  const location = useLocation();
  const { id, title, placeHolderName, placeHolderEmail, placeHolderPhone } =
    location.state;
  let navigate = useNavigate();

  return (
    <div>
      <h1>{`${title}`}</h1>
      <Formik
        initialValues={{
          name: id ? placeHolderName : '',
          email: id ? placeHolderEmail : '',
          phone: id ? placeHolderPhone : '',
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          } else if (
            contactList.filter(({ name }) => name === values.name).length !== 0
          ) {
            errors.name = 'This name is already in the list';
          }

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.phone) {
            errors.phone = 'Required';
          } else if (
            !/^[0-9]{1,3}-.[0-9]{1,3}-.[0-9]{1,4}$/i.test(values.phone)
          ) {
            errors.phone = 'Invalid phone number';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          !id
            ? dispatch(addContact(values))
            : dispatch(editContact({ id, ...values }));
          navigate('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="name" name="name" placeholder={`${placeHolderName}`} />
            <ErrorMessage name="name" component="div" />
            <Field
              type="email"
              name="email"
              placeholder={`${placeHolderEmail}`}
            />
            <ErrorMessage name="email" component="div" />
            <Field
              type="text"
              name="phone"
              placeholder={`${placeHolderPhone}`}
            />
            <ErrorMessage name="phone" component="div" />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => navigate('/')}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
