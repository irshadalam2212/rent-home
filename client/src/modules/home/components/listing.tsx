import { Button, capitalize, Card, CardActionArea, CardContent, CardMedia, Chip, TextField, Typography } from "@mui/material"
import Heading from "../../../components/shared/heading"
import { houseCategory, houseType } from "../../../data"
import { useNavigate } from "react-router-dom"
import { useGetAllProperty } from "../../property/hooks/property.queries"
import { MdEdit } from "react-icons/md"

const Listing = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const { data: GetAllProperty } = useGetAllProperty()

    const handleEditClick = (propertyId: string) => {
        const encodedId = encodeURIComponent(btoa(propertyId));
        navigate(`/edit-listing?propertyId=${encodedId}`);
    };

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
                                <CardActionArea
                                // onClick={() => token ? navigate('/listing-details') : "/login"}
                                >
                                    <CardMedia
                                        sx={{ height: 220 }}
                                        component="img"
                                        image={property?.propertyImage}
                                        alt={property?.propertyName}
                                    />
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-2">
                                            <Typography variant="h5" component="div">
                                                {capitalize(property?.propertyName)}
                                            </Typography>
                                            <span
                                                className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-all duration-200"
                                                onClick={() => {handleEditClick(property?._id)}}
                                            >
                                                <MdEdit />
                                            </span>
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
            </div>
        </div>
    )
}

export default Listing