import { useSelector } from 'react-redux';
import { getItemsList } from 'redux/Reducers/itemsSlice';
import { useParams } from 'react-router-dom';

export const useEditHook = () => {
  const contactList = useSelector(getItemsList);

  const params = useParams();
  const fields = !params?.id
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
      };
  return fields;
};

//--------------------------------------------------------------------
