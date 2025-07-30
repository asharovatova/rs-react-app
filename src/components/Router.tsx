import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from '../pages/Main/MainPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { AboutPage } from '../pages/About/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
