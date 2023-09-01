import {createBrowserRouter} from "react-router-dom";
import {DefaultDasboardPage, HomePage} from "../pages";
import {AppLayout} from "../layouts";
import ErrorPage from "../pages/errors/Error.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/dashboards",
        element: <AppLayout/>,
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