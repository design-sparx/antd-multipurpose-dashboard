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
                        colorPrimary: '#2378c3',
                        borderRadius: 6,
                        fontFamily: "Libre Franklin, sans-serif"
                    },
                    components: {
                        Breadcrumb: {
                            linkColor: 'rgba(0,0,0,.8)',
                            itemColor: 'rgba(0,0,0,.8)'
                        },
                        Card: {
                            colorBgContainer: "none"
                        }
                    },
                }}
            >
                <RouterProvider router={routes}/>
            </ConfigProvider>
        </HelmetProvider>
    )
}

export default App
