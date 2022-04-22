import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, editContact, getContactList } from 'redux/contactReducer';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export const Edit = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(getContactList);
  const location = useLocation();

  console.log(location);

  let navigate = useNavigate();

  const params = useParams();
  const [fields, setFields] = useState(
    !params?.id
      ? {
          id: null,
          title: `Add Contact : `,
          name: 'Sebastian Pereiro',
          email: 'vasiya@rus.net',
          phone: '000-000-0000',
        }
      : {
          id: params.id,
          title: `Edit Contact # ${
            contactList.filter(el => el.id === params.id)[0].name
          }`,
          name: contactList.filter(el => el.id === params.id)[0].name,
          email: contactList.filter(el => el.id === params.id)[0].email,
          phone: contactList.filter(el => el.id === params.id)[0].phone,
        }
  );

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
            contactList.filter(({ name }) => name === values.name).length !==
              0 &&
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
                location.state?.id ? navigate(-1) : navigate('/')
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
