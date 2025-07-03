import { Button, capitalize, Card, CardActionArea, CardContent, CardMedia, Chip, TextField, Typography } from "@mui/material"
import Heading from "../../../components/shared/heading"
import { houseCategory, houseType } from "../../../data"
import { useNavigate } from "react-router-dom"
import { useDeleteProperty, useGetAllProperty } from "../../property/hooks/property.queries"
import { MdDelete, MdEdit } from "react-icons/md"
import { Notification, toast } from "../../../components/ui"
import ConfirmDialog from "../../../components/shared/ConfirmDialog"
import { useState } from "react"

const Listing = () => {
    const navigate = useNavigate()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentPropertyId, setCurrentPropertyId] = useState("")
    // const token = localStorage.getItem("token")

    const { data: GetAllProperty, refetch: RefetchAllProperty } = useGetAllProperty()
    const { mutateAsync: DeleteListing, isLoading: listingDeletionIsLoading } =
        useDeleteProperty()

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
            <TextField id="outlined-search" label="Search property" type="search" size="small" />
            <div className="flex justify-end">
                <Button
                    className="uppercase"
                    variant="outlined"
                    onClick={() => navigate("/add-listing")}
                >
                    ➕ Add Listing
                </Button>
            </div>
            <div className="flex justify-between">
                {/* filter */}
                <div className="flex flex-col gap-3 w-[300px]">
                    <h4 className="text-base font-normal text-[#616161]">Filter By Bedrooms</h4>
                    {/* filter by bedrooms  */}
                    <div className="flex flex-col gap-2">
                        {
                            houseType.map((house, index) => (
                                <span key={index}
                                    className="text-sm text-[#999]"
                                >{house}</span>
                            ))
                        }
                    </div>
                    <h4 className="text-base font-normal text-[#616161]">Filter By Category</h4>
                    {/* filter by category */}
                    <div className="flex flex-col gap-2">
                        {
                            houseCategory.map((house, index) => (
                                <span key={index}
                                    className="text-sm text-[#999]"
                                >{house}</span>
                            ))
                        }
                    </div>
                </div>
                {/* Properties listing  */}
                <div className="grid grid-cols-3 gap-5 ">
                    {
                        GetAllProperty?.data?.map((property) => (
                            <Card sx={{ maxWidth: 400 }} className="relative">
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ height: 220 }}
                                        component="img"
                                        image={property?.propertyImage}
                                        alt={property?.propertyName}
                                    />
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-2">
                                            <Typography variant="h5" component="div" onClick={() => navigate(`/listing-details/?propertyId=${property?._id}`)}>
                                                {capitalize(property?.propertyName)}
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
                                            {property?.description}
                                        </Typography>
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