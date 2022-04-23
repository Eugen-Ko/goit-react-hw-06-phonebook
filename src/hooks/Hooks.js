import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getItemsList, getFilterQuery } from 'redux/dataSelector';
import { useParams, useNavigate } from 'react-router-dom';

//------------------------------------------------------------------

export const useHomeHook = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const contactList = useSelector(getItemsList);
  const filter = useSelector(getFilterQuery);

  useEffect(() => {
    filter !== ''
      ? setList(
          contactList.filter(({ name }) => name.toLowerCase().includes(filter))
        )
      : setList(contactList);
  }, [contactList, filter]);

  useEffect(() => {}, [filter]);
  useEffect(() => {
    filter !== '' ? navigate(`?query=${filter}`) : navigate(`/`);
  }, [filter, navigate]);
  return { filter, list };
};

//-------------------------------------------------------------------

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
