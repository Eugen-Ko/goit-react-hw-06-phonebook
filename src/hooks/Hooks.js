import { useSelector } from 'react-redux';
import { getContactList } from 'redux/contactReducer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const useEditHook = () => {
  const contactList = useSelector(getContactList);

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
          title: `Edit Contact # ${
            contactList.filter(el => el.id === params.id)[0].name
          }`,
          ...contactList.filter(el => el.id === params.id)[0],
        }
  );
  return fields;
};

//--------------------------------------------------------------------
