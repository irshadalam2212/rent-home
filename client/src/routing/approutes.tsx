import { FC } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home'
import Login from '../modules/login/components/login'
import Privateroutes from './privateroutes'
import SignUp from '../modules/signup/components/signup'
import Addlisting from '../pages/addlisting'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Dev_Var } from '../../environment'
import { environments } from '../models/constants'
import ListingDetails from '../pages/listingdetails'
const AppRoutes: FC = () => {
  
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus:
              Dev_Var === environments?.development ? false : true,
          },
        },
      });

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "home",
                    element: <Home />
                },
                {
                    index: true,
                    element: <Navigate to="home" />
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "signup",
                    element: <SignUp />
                },
                {
                    path: "/*",
                    element: <Privateroutes />,
                    children: [
                        {
                            path: "add-listing",
                            element: <Addlisting />
                        },
                        {
                            path: "listing-details",
                            element: <ListingDetails />
                        },
                        {
                            path: "my-profile",
                            element: "My Profile"
                        },
                        {
                            path: "hosts",
                            element: "Host"
                        },
                        {
                            path: "logout",
                            element: <Home />
                        }
                    ]
                }
            ]
        }
    ])

    return (
        <QueryClientProvider client={queryClient} contextSharing={true}>
        {/* <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} /> */}
        <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export { AppRoutes }