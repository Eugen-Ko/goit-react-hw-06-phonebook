import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <h1>
      <p>404 Page not found !!!</p>
      <p>Otaka hernya malyata....</p>
      <Link to="/">Сome back to main page...</Link>
    </h1>
  );
};
