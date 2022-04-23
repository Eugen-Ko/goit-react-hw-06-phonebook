import { useSelector } from 'react-redux';
import { getItemsList } from 'redux/dataSelector';
import { useParams } from 'react-router-dom';

export const useEditHook = () => {
  const contacts = useSelector(getItemsList);
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
          contacts.find(el => el.id === params.id).name
        }`,
        ...contacts.find(el => el.id === params.id),
      };
  return fields;
};

//--------------------------------------------------------------------
