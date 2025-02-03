import { Navigate } from "react-router-dom"
// import { constants } from "../models/constants"
import MasterLayout from "../layout/masterlayout"

const Privateroutes = () => {
    // const { TOKEN } = constants
    const isAuthenticated = localStorage.getItem("user")
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <MasterLayout />
        </>
    )
}

export default Privateroutes