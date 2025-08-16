
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useWishListStore } from '../../store/wishlist.store';
import { Button } from '../ui';

const Navbar = () => {
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/home")
    }

    const { wishlist } = useWishListStore()
    const wishlistCount = wishlist?.length

    return (
        <div className="flex justify-between items-center py-3 bg-white">
            <h1
                className="text-xl text-primary cursor-pointer"
                onClick={() => navigate('/home')}
            >
                Urban<span className="text-gray-400">Lease</span>
            </h1>
            {/* <img
                src="/client/public/logo.jpg"
                alt="Urbanlease Logo"
                className="w-32 cursor-pointer"
                onClick={() => navigate('/home')}
            /> */}
            <div className='flex gap-8 items-center text-primary cursor-pointer hover:text-primary-deep'>
                <span
                    className="uppercase"
                    onClick={() => navigate("/users")}
                >
                    browse user's
                </span>
                {
                    token && (
                        <span
                            className="uppercase cursor-pointer text-primary hover:text-primary-deep"
                            onClick={() => navigate("/my-profile")}
                        >
                            My Profile
                        </span>
                    )
                }
                {
                    token && (
                        <div
                            className="uppercase relative text-primary cursor-pointer hover:text-primary-deep"
                            onClick={() => navigate("/wishlist")}
                        >
                            <FaHeart size={20} />
                            <span className='absolute -top-2 left-5'>{wishlistCount}</span>
                        </div>
                    )
                }
                {
                    !token &&
                    (
                        <Button
                            className="uppercase"
                            variant="plain"
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
                            variant="plain"
                            size='sm'
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