import {createBrowserRouter} from "react-router-dom";
import {DefaultDasboardPage, HomePage} from "../pages";
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
                element: <DefaultDasboardPage/>
            }
        ]
    }
]);

export default router