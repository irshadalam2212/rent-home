import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/navbar'
import Footer from '../components/layout/footer'

const MasterLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MasterLayout