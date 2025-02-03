import { Card, CardActionArea, CardContent, CardMedia, Chip, TextField, Typography } from "@mui/material"
import Heading from "./heading"
import { houseCategory, houseType, housesForRent } from "../data"

const Listing = () => {
    return (
        <div className="flex flex-col gap-5">
            <Heading>
                Listing
            </Heading>
            <TextField id="outlined-search" label="Search property" type="search" size="small" />
            <div className="flex justify-between">
                {/* filter */}
                <div className="flex flex-col gap-3">
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
                {/* homes  */}
                <div className="grid grid-cols-3 gap-5">
                    {
                        housesForRent.map((home) => (
                            <Card sx={{ maxWidth: 400 }} className="relative">
                                <CardActionArea>
                                    <CardMedia
                                    sx={{height: 220}}
                                        component="img"
                                        image={home.image}
                                        alt={home.nameOfHouse}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {home.nameOfHouse}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px" }}>
                                            {home.address}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {home.rent}
                                        </Typography>
                                        <Chip sx={{color: "#3b85db", backgroundColor: "white"}} label={home.type} variant="outlined" className="absolute top-3 right-2"/>
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