import { FaHeart } from "react-icons/fa"
import { Avatar, Card } from "../components/ui"
import { useWishListStore } from "../store/wishlist.store"
import noData from "/public/9264822.jpg"

export const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishListStore()
    const wishlistCount = wishlist?.length

    const cardFooter = (
        <div className="flex items-center">
            <Avatar
                size={30}
                className="mr-2"
                shape="circle"
                src="/img/avatars/thumb-1.jpg"
            />
            <span>
                <h6 className="text-sm">Kristen Fisher</h6>
                <span className="text-xs">Sep 23, 2021</span>
            </span>
        </div>
    )
    return (
        <div>
            <h3 className="mb-4">Wishlist ({wishlistCount})</h3>
            {
                wishlistCount > 0 ?
                    <div className="grid md:grid-cols-3 gap-3">
                        {wishlist?.map((wishlist) => (
                            <Card
                                clickable
                                className="relative hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                header={{
                                    content:
                                        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                            <img src={wishlist?.propertyImage} alt={wishlist?.propertyName} className="h-52 w-full object-cover" />
                                        </div>,
                                    bordered: false,
                                    className: 'p-0',
                                }}
                                footer={{
                                    content: cardFooter,
                                    bordered: false,
                                }}
                            >
                                <span className="text-emerald-600 font-semibold">
                                    {(wishlist?.propertyName).toUpperCase()}
                                </span>
                                <span
                                    className={`absolute right-5 text-red-500 mt-1`}
                                    onClick={() => removeFromWishlist(wishlist?._id)}
                                >
                                    <FaHeart size={20} />
                                </span>
                                <div className="text-gray-600 my-3 font-semibold">{wishlist?.rent}</div>
                                <h4 className="font-bold my-3">{(wishlist?.location).toUpperCase()}</h4>
                                <p>
                                    {wishlist?.description}
                                </p>
                            </Card>
                        ))
                        }
                    </div>
                    :
                    <div className="flex flex-col gap-5 items-center justify-center h-[300px]">
                        <img src={noData} alt="" className="h-[200px]" />
                        No Data Found
                    </div>
            }
        </div>
    )
}

export default Wishlist
