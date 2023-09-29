import {RouterProvider} from 'react-router-dom'
import routes from "./routes/routes.tsx";
import {ConfigProvider} from "antd";
import {HelmetProvider} from "react-helmet-async"

import "./App.css"

// color palettes: triadic #A1A7CB, #CBA1A7, #A7CBA1

function App() {
    return (
        <HelmetProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#925368',
                        borderRadius: 6,
                    },
                    components: {
                        Breadcrumb: {
                            linkColor: 'rgba(0,0,0,.8)',
                            itemColor: 'rgba(0,0,0,.8)'
                        }
                    }
                }}
            >
                <RouterProvider router={routes}/>
            </ConfigProvider>
        </HelmetProvider>
    )
}

export default App
