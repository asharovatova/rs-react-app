import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Some author information</p>

      <p>
        This project was built for the{' '}
        <Link to="https://rs.school/courses/reactjs" target="_blank">
          RSSchool React Course
        </Link>
      </p>

      <Link to="/">Go to Home Page</Link>
    </div>
  );
};
