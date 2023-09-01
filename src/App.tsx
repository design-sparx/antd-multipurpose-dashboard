import {RouterProvider} from 'react-router-dom'
import routes from "./routes/routes.tsx";
import {ConfigProvider} from "antd";

function App() {
    return (
        <ConfigProvider>
            <RouterProvider router={routes}/>
        </ConfigProvider>
    )
}

export default App
