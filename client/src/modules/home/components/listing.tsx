import { Card, CardActionArea, CardContent, CardMedia, Chip, TextField, Typography } from "@mui/material"
import Heading from "../../../components/shared/heading"
import { houseCategory, houseType } from "../../../data"
import { useNavigate } from "react-router-dom"
import { useDeleteProperty, useGetAllProperty } from "../../property/hooks/property.queries"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import { Button, Notification, toast } from "../../../components/ui"
import ConfirmDialog from "../../../components/shared/ConfirmDialog"
import { useMemo, useState } from "react"
import { capitalize } from "../../../utils/capitalize"
import { useWishListStore } from "../../../store/wishlist.store"
import DualRangeSlider from "../../../components/ui/DualRangeSlider/DualRangeSlider"

const Listing = () => {
    const navigate = useNavigate()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentPropertyId, setCurrentPropertyId] = useState("")
    const [filters, setFilters] = useState({
        searchQuery: "",
        bedrooms: [] as number[],
        category: [] as string[],
        priceRange: {
            minPrice: 0,
            maxPrice: 0
        }
    })
    const [readmore, setReadMore] = useState({})
    // const token = localStorage.getItem("token")

    const { data: GetAllProperty, refetch: RefetchAllProperty } = useGetAllProperty()
    const { mutateAsync: DeleteListing, isLoading: listingDeletionIsLoading } =
        useDeleteProperty()

    //--------------store--------------//
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishListStore()

    const handleWishListToggle = (id: string) => {
        if (isInWishlist(id)) {
            removeFromWishlist(id);
        } else {
            const property = GetAllProperty?.data?.find((prop) => prop._id === id);

            if (property) {
                const completeProperty = { ...property, __v: 0 };
                addToWishlist(completeProperty);
            }
        }
    };

    const handleDialogOpen = (propertyId: string) => {
        setCurrentPropertyId(propertyId)
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleEditClick = (propertyId: string) => {
        // const encodedId = encodeURIComponent(btoa(propertyId));
        const encodedId = (propertyId);
        navigate(`/edit-listing?propertyId=${encodedId}`);
    };

    const handleSearchChange = (e: any) => {
        // console.log(e.target.value)
        setFilters(prev => ({ ...prev, searchQuery: e?.target?.value }))
    }

    const handleBedroomChange = (noOfBedroom: any) => {
        setFilters(prev => {
            const alreadySelected = prev.bedrooms.includes(noOfBedroom)
            return {
                ...prev,
                bedrooms: alreadySelected
                    ? prev.bedrooms.filter(b => b !== noOfBedroom) // remove
                    : [...prev.bedrooms, noOfBedroom]              // add
            }
        })
    }

    const handleCategoryChange = (category: string) => {
        setFilters(prev => {
            const alreadySelected = prev.category.includes(category)
            return {
                ...prev,
                category: alreadySelected
                    ? prev.category.filter(c => c !== category) // remove if already selected
                    : [...prev.category, category]              // add if not selected
            }
        })
    }

    const handlePriceChange = (minPrice: number, maxPrice: number) => {
        setFilters((prev) => ({
            ...prev,
            priceRange: {
                ...prev.priceRange,
                minPrice,
                maxPrice,
            },
        }));
    };



    const toggleReadMore = (id: any) => {
        setReadMore((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleCheckout = (id: string) => {
        navigate(`/listing-details/?propertyId=${id}`)
    }


    //filter data 
    const filteredData = useMemo(() => {
        return GetAllProperty?.data
            ?.filter(item =>
                filters.searchQuery === '' ||
                item?.propertyName?.toLowerCase().includes(filters?.searchQuery?.toLowerCase())
            )
            ?.filter(item =>
                filters.bedrooms?.length === 0 ||
                filters.bedrooms?.includes(item?.rooms)
            )
            ?.filter(item =>
                filters.category.length === 0 ||
                filters.category.includes(item?.propertyType)
            )
            ?.filter(item => {
                const { minPrice, maxPrice } = filters?.priceRange;
                return (
                    (minPrice === 0 || item?.rent >= minPrice) &&
                    (maxPrice === 0 || item?.rent <= maxPrice)
                )
            }
            )
    }, [GetAllProperty?.data, filters])

    const handleDeleteProperty = async () => {
        try {
            if (currentPropertyId) {
                const response = await DeleteListing(currentPropertyId)
                toast.push(
                    <Notification type="success" duration={3000}>
                        {response?.message}
                    </Notification>,
                    {
                        placement: "top-end"
                    }
                )
            }
            RefetchAllProperty()
            setDialogOpen(false)
        } catch (error: any) {
            console.error('Error while deleting user', error)
            toast.push(
                <Notification type="danger" duration={5000}>
                    {error?.message}
                </Notification>,
                {
                    placement: 'top-end',
                },
            )
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <Heading>
                Listing
            </Heading>
            <TextField id="outlined-search" label="Search property" type="search" size="small" onChange={(e) => handleSearchChange(e)} />
            <div className="flex justify-end">
                <Button
                    className="uppercase flex gap-2 items-center justify-center"
                    size="sm"
                    // variant="outlined"
                    onClick={() => navigate("/add-listing")}
                >
                    <MdAdd size={18} /> {" "} Add Listing
                </Button>
            </div>
            <div className="flex justify-between">
                {/* filter */}
                <div className="flex flex-col gap-3 w-[300px]">
                    <h4 className="text-base font-normal text-gray-600">Filter By Bedrooms</h4>
                    {/* filter by bedrooms  */}
                    <div className="flex flex-wrap gap-2 w-[250px]">
                        {
                            houseType.map((house, index) => {
                                // const value = house.charAt(0)
                                const isSelected = filters.bedrooms.includes(house.value)
                                return (
                                    <span
                                        key={index}
                                        className={` text-xs w-fit cursor-pointer rounded-full px-3 py-1 ${isSelected ? "border border-primary text-primary bg-blue-50" : "text-gray-400 border border-gray-400 bg-gray-50"}`}
                                        onClick={() => handleBedroomChange(house.value)}
                                    >
                                        {house.label}
                                    </span>
                                )
                            }
                            )
                        }
                    </div>
                    <h4 className="text-base font-normal text-gray-600">Filter By Category</h4>
                    {/* filter by category */}
                    <div className="flex flex-wrap gap-2 w-[250px]">
                        {
                            houseCategory.map((house, index) => {
                                const isSelected = filters.category.includes(house.value)
                                return (
                                    <span
                                        key={index}
                                        className={` text-xs w-fit cursor-pointer rounded-full px-3 py-1 ${isSelected ? "border border-primary text-primary bg-blue-50" : "text-gray-400 border border-gray-400 bg-gray-50"}`}
                                        onClick={() => handleCategoryChange(house.value)}
                                    >
                                        {house.label}
                                    </span>
                                )
                            }

                            )
                        }
                    </div>
                    {/* filter by price */}
                    <h4 className="text-base font-normal text-gray-600">Filter By Price</h4>
                    <DualRangeSlider
                        min={0}
                        max={100000}
                        onChange={({ min, max }) => {
                            handlePriceChange(min, max)
                        }}
                    />
                </div>
                {/* Properties listing  */}
                <div className="grid grid-cols-3 gap-5 ">
                    {
                        filteredData?.map((property) => (
                            <Card key={property?._id} sx={{ maxWidth: 400 }} className="relative">
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ height: 220 }}
                                        component="img"
                                        image={property?.propertyImage}
                                        alt={property?.propertyName}
                                    />
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-2">
                                            <Typography variant="h5" component="div" onClick={() => handleCheckout(property?._id)}>
                                                {property?.propertyName?.length > 13
                                                    ? capitalize(property?.propertyName.substring(0, 13) + "...")
                                                    : capitalize(property?.propertyName)
                                                }
                                            </Typography>
                                            <div
                                                className="flex gap-2"
                                            >
                                                <span
                                                    className="cursor-pointer p-2 rounded-full hover:bg-gray-200 hover:text-blue-700 transition-all duration-200"
                                                    onClick={() => { handleEditClick(property?._id) }}
                                                >
                                                    <MdEdit size={18} />
                                                </span>
                                                <span
                                                    className="cursor-pointer p-2 rounded-full hover:bg-gray-200 hover:text-error transition-all duration-200"
                                                    onClick={() => { handleDialogOpen(property?._id) }}
                                                >
                                                    <MdDelete size={18} />
                                                </span>
                                            </div>
                                        </div>

                                        <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px", marginBottom: "8px" }}>
                                            {capitalize(property.location)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: "8px" }}>
                                            {property.rent}
                                        </Typography>
                                        <Chip sx={{ color: "#3b85db", backgroundColor: "white" }} label={capitalize(property.propertyType)} variant="outlined" className="absolute top-3 right-2" />
                                        <Typography variant="body2" color="text.secondary" className="ml-6">
                                            {readmore ? property?.description?.substring(0, 50) : property?.description}
                                            <span className="text-[#3b85db] ml-1 cursor-pointer" onClick={() => toggleReadMore(property._id)}>
                                                {readmore ? "read more" : "read less"}
                                            </span>
                                        </Typography>
                                        <div
                                            className="flex justify-between items-center mt-6"
                                        >
                                            <Button
                                                variant="solid"
                                                size="sm"
                                                type="button"
                                                onClick={() => handleCheckout(property?._id)}
                                                className="text-xs"
                                            >
                                                Checkout
                                            </Button>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="!text-xs"
                                                onClick={() => handleWishListToggle(property?._id)}
                                            >
                                                {isInWishlist(property?._id) ? "Remove From Wishlist" : "Add To Wishlist"}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))
                    }
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete property"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDeleteProperty}
                    confirmButtonDisabled={listingDeletionIsLoading}
                />
            </div>
        </div>
    )
}

export default Listing