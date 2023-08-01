import { createBrowserRouter } from 'react-router-dom';
import PageTemplate from './components/layout/page-template/PageTemplate';
import PetListPage from './pages/pet-list-page/PetListPage';
import HealthLogsPage from './pages/health-logs-page/HealthLogsPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <PetListPage />,
      },
      {
        path: 'healthLogs/:id',
        element: <HealthLogsPage />,
      },
    ],
  },
]);
