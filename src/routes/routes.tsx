import {createBrowserRouter, useLocation} from "react-router-dom";
import {
    BiddingDashboardPage,
    CorporateAboutPage,
    CorporateContactPage,
    CorporateFaqPage,
    CorporateLicensePage,
    CorporatePricingPage,
    CorporateTeamPage,
    DefaultDashboardPage,
    EcommerceDashboardPage,
    HomePage,
    MarketingDashboardPage,
    ProjectsDashboardPage,
    SitemapPage,
    SocialDashboardPage,
    UserProfileDetailsPage, UserProfileInformationPage,
    UserProfilePreferencesPage
} from "../pages";
import ErrorPage from "../pages/errors/Error.tsx";
import {CorporateLayout, DashboardLayout, GuestLayout, UserAccountLayout} from "../layouts";
import {LearningDashboardPage, LogisticsDashboardPage} from "../pages/dashboards";
import React, {ReactNode, useEffect} from "react";

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0, left: 0, behavior: "smooth"
        }); // Scroll to the top when the location changes
    }, [pathname]);

    return null; // This component doesn't render anything
};

type PageProps = {
    children: ReactNode
}

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({children}: PageProps) => {
    return (
        <>
            <ScrollToTop/>
            {children}
        </>
    )
}

// Create the router
const router = createBrowserRouter([
    {
        path: "/",
        element: <PageWrapper children={<GuestLayout/>}/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                path: "home",
                element: <HomePage/>
            }
        ]
    },
    {
        path: "/dashboards",
        element: <PageWrapper children={<DashboardLayout/>}/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
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
            {
                path: "social",
                element: <SocialDashboardPage/>
            },
            {
                path: "bidding",
                element: <BiddingDashboardPage/>
            },
            {
                path: "learning",
                element: <LearningDashboardPage/>
            },
            {
                path: "logistics",
                element: <LogisticsDashboardPage/>
            }
        ]
    },
    {
        path: "/sitemap",
        element: <PageWrapper children={<DashboardLayout/>}/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                path: "",
                element: <SitemapPage/>
            }
        ]
    },
    {
        path: "/corporate",
        element: <PageWrapper children={<CorporateLayout/>}/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                path: "about",
                element: <CorporateAboutPage/>
            },
            {
                path: "team",
                element: <CorporateTeamPage/>
            },
            {
                path: "faqs",
                element: <CorporateFaqPage/>
            },
            {
                path: "contact",
                element: <CorporateContactPage/>
            },
            {
                path: "pricing",
                element: <CorporatePricingPage/>
            },
            {
                path: "license",
                element: <CorporateLicensePage/>
            }
        ]
    },
    {
        path: "/user-profile",
        element: <PageWrapper children={<UserAccountLayout/>}/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                path: "details",
                element: <UserProfileDetailsPage/>
            },
            {
                path: "preferences",
                element: <UserProfilePreferencesPage/>
            },
            {
                path: "information",
                element: <UserProfileInformationPage/>
            },
        ]
    }
]);

export default router