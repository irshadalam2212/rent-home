import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/home")
    }

    return (
        <div className="flex justify-between items-center py-3 bg-white">
            <h1
                className="text-xl text-[#3B85DB] cursor-pointer"
                onClick={() => navigate('/home')}
            >
                Urban<span className="text-[#AEAEB5]">Lease</span>
            </h1>
            {/* <img
                src="/client/public/logo.jpg"
                alt="Urbanlease Logo"
                className="w-32 cursor-pointer"
                onClick={() => navigate('/home')}
            /> */}
            <div className='flex gap-8 items-center'>
                <Button
                    className="uppercase"
                    variant="text"
                    onClick={() => navigate("/users")}
                >
                    browse user's
                </Button>
                {
                    token && (
                        <Button
                            className="uppercase"
                            variant="text"
                            onClick={() => navigate("/my-profile")}
                        >
                            My Profile
                        </Button>
                    )
                }
                {/* {
                    token && (
                        <Button
                            className="uppercase"
                            variant="outlined"
                            onClick={() => navigate("/add-listing")}
                        >
                            Add Listing
                        </Button>
                    )
                } */}
                {
                    !token &&
                    (
                        <Button
                            className="uppercase"
                            variant="outlined"
                            onClick={() => navigate("/login")}
                        >
                            log in / sign up
                        </Button>
                    )
                }
                {
                    token && (
                        <Button
                            className="uppercase"
                            variant="contained"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar