import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Home } from 'page/Home';
import { Edit } from 'page/Edit';
// import { contacts } from 'contacts';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="edit" element={<Edit />}></Route>
      </Route>
    </Routes>
  );
};
