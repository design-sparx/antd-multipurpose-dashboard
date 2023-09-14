import {createBrowserRouter} from "react-router-dom";
import {
    DefaultDashboardPage,
    EcommerceDashboardPage,
    HomePage,
    MarketingDashboardPage,
    ProjectsDashboardPage
} from "../pages";
import ErrorPage from "../pages/errors/Error.tsx";
import {DashboardLayout} from "../layouts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/dashboards",
        element: <DashboardLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "default",
                element: <DefaultDashboardPage/>
            },
            {
                path: "projects",
                element: <ProjectsDashboardPage/>
            },
            {
                path: "ecommerce",
                element: <EcommerceDashboardPage/>
            },
            {
                path: "marketing",
                element: <MarketingDashboardPage/>
            },
        ]
    }
]);

export default router