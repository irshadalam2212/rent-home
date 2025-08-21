import { Navigate, Outlet } from "react-router-dom"

const Privateroutes = () => {
    const isAuthenticated = localStorage.getItem("token")
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default Privateroutes