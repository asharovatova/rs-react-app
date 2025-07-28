import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Page not found.</p>

      <Link to="/">Go to Home Page</Link>
    </div>
  );
};
