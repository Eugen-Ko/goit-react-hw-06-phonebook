import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEditHook } from 'hooks/Hooks';
import {
  addContact,
  editContact,
  changeQuery,
  getItemsList,
  getFilterQuery,
} from 'redux/dataSelector';

export const Edit = () => {
  const dispatch = useDispatch();
  const contact = useSelector(getItemsList);
  const filter = useSelector(getFilterQuery);
  let navigate = useNavigate();

  const fields = useEditHook();

  const { id, title, name, email, phone } = fields;
  return (
    <div>
      <h1>{`${title}`}</h1>
      <Formik
        initialValues={{
          name: name,
          email: email,
          phone: phone,
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          } else if (
            contact.filter(
              ({ name }) =>
                name.toLowerCase().trim() === values.name.toLowerCase().trim()
            ).length !== 0 &&
            id === null
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
          dispatch(changeQuery(''));
          navigate('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="name" name="name" placeholder={`${name}`} />
            <ErrorMessage name="name" component="div" />
            <Field type="email" name="email" placeholder={`${email}`} />
            <ErrorMessage name="email" component="div" />
            <Field type="text" name="phone" placeholder={`${phone}`} />
            <ErrorMessage name="phone" component="div" />
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() =>
                filter !== '' && !filter ? navigate(-1) : navigate('/')
              }
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
