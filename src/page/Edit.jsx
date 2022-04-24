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
import {
  Flex,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import { MdContacts, MdEmail, MdPhoneInTalk } from 'react-icons/md';

export const Edit = () => {
  const dispatch = useDispatch();
  const contact = useSelector(getItemsList);
  const filter = useSelector(getFilterQuery);
  let navigate = useNavigate();

  const fields = useEditHook();

  const { id, title, name, email, phone } = fields;
  return (
    <Flex justify="center" h="100vh" p={4}>
      <Box
        p={6}
        rounded="md"
        w="sm"
        h="380px"
        border="3px"
        borderStyle="ridge"
        bg="#fffdde"
      >
        <Heading
          mb={5}
          p={2}
          w="100%"
          // h="70px"
          borderWidth="3px"
          borderRadius="lg"
          borderStyle="ridge"
          align="center"
          color="#5b0c9c"
          fontSize="20px"
          fontWeight="700"
        >
          {`${title}`}
        </Heading>
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

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
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
              <List>
                <ListItem>
                  <Flex>
                    <ListIcon
                      as={MdContacts}
                      color="green.500"
                      m="12px auto auto auto"
                    />
                    <Field
                      as={Input}
                      bg="#fffdde"
                      variant="flushed"
                      m="0 0 5px 16px"
                      p={2}
                      type="name"
                      name="name"
                      placeholder={`${name}`}
                    />
                  </Flex>
                  <Box
                    fontSize="13px"
                    align="center"
                    w="100%"
                    h={5}
                    color="red"
                    mb={3}
                  >
                    <ErrorMessage name="name" />
                  </Box>
                </ListItem>
                <ListItem>
                  <Flex>
                    <ListIcon
                      as={MdEmail}
                      color="green.500"
                      m="12px auto auto auto"
                    />

                    <Field
                      as={Input}
                      bg="#fffdde"
                      variant="flushed"
                      m="0 0 5px 16px"
                      p={2}
                      type="email"
                      name="email"
                      placeholder={`${email}`}
                    />
                  </Flex>
                  <Box
                    fontSize="13px"
                    align="center"
                    w="100%"
                    h={5}
                    color="red"
                    mb={3}
                  >
                    <ErrorMessage name="email" />
                  </Box>
                </ListItem>{' '}
                <ListItem>
                  <Flex>
                    <ListIcon
                      as={MdPhoneInTalk}
                      color="green.500"
                      m="12px auto auto auto"
                    />

                    <Field
                      as={Input}
                      bg="#fffdde"
                      variant="flushed"
                      m="0 0 5px 16px"
                      p={2}
                      type="text"
                      name="phone"
                      placeholder={`${phone}`}
                    />
                  </Flex>
                  <Box
                    fontSize="13px"
                    align="center"
                    w="100%"
                    h={5}
                    color="red"
                    mb={3}
                  >
                    <ErrorMessage name="phone" />
                  </Box>
                </ListItem>
              </List>
              <Center>
                <Button
                  type="submit"
                  width="100px"
                  h={6}
                  mr={4}
                  colorScheme="blue"
                  boxShadow="0px 10px 13px -7px #000000"
                  variant="solid"
                >
                  Submit
                </Button>
                <Button
                  width="100px"
                  h={6}
                  colorScheme="pink"
                  boxShadow="0px 10px 13px -7px #000000"
                  variant="solid"
                  onClick={() =>
                    filter !== '' && !filter ? navigate(-1) : navigate('/')
                  }
                >
                  Cancel
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
