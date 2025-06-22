import { ROUTES } from './routes.ts';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import FileAnalysisPage from '../pages/FileAnalysisPage/FileAnalysisPage.tsx';
import FileGenerationPage from '../pages/FileGenerationPage/FileGenerationPage.tsx';
import HistoryPage from '../pages/HistoryPage/HistoryPage.tsx';

const Router = () => {
    const routes = [
        {
            path: ROUTES.ANALYSIS,
            element: <FileAnalysisPage />,
        },
        {
            path: ROUTES.GENERATION,
            element: <FileGenerationPage />,
        },
        {
            path: ROUTES.HISTORY,
            element: <HistoryPage />,
        },
        {
            path: '*',
            element: <Navigate to={ROUTES.ANALYSIS} replace />,
        },
    ];

    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
};

export default Router;
