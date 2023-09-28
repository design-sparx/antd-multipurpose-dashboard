import {RouterProvider} from 'react-router-dom'
import routes from "./routes/routes.tsx";
import {ConfigProvider} from "antd";
import {Helmet, HelmetProvider} from "react-helmet-async"

// color palettes: triadic #A1A7CB, #CBA1A7, #A7CBA1

function App() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    Multi dashboard template with React and Ant Design v5 - AntD Dashboard by Design Sparx
                </title>
                <meta
                    name="description"
                    content="Explore a powerful multi-dashboard application built with React and Ant Design (v5) for efficient data visualization and management. A large number of settings, additional services and widgets."/>
                <meta
                    name="keywords"
                    content="Design Sparx, antd, antd5, admin themes, react, admin themes, antd admin, antd dashboard, antd dark mode"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>
                <meta
                    property="og:title"
                    content="Design Sparx – Multi dashboard template with React and Ant Design v5 - AntD Dashboard by Design Sparx"/>
                <meta
                    property="og:url"
                    content="https://themes.getbootstrap.com/product/good-bootstrap-5-admin-dashboard-template"/>
                <meta property="og:site_name" content="Good by Keenthemes"/>
                <link rel="canonical" href="https://preview.keenthemes.com/good"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
            </Helmet>
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
