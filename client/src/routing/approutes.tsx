import { FC } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home'
import Login from '../components/login'
import Privateroutes from './privateroutes'
import SignUp from '../components/signup'
import Addlisting from '../pages/addlisting'
const AppRoutes: FC = () => {
  

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
        // <QueryClientProvider client={queryClient} contextSharing={true}>
        // <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
        <RouterProvider router={router} />
        // </QueryClientProvider>
    );
};

export { AppRoutes }