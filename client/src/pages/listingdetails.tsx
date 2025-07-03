import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom";
import { useGetPropertById } from "../modules/property/hooks/property.queries";
import capitalize from "../components/ui/utils/capitalize";

const ListingDetails = () => {
    //const and state variables
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get('propertyId');
    const { data: PropertyData } = useGetPropertById(propertyId ?? "");
    return (
        <div className="flex flex-col gap-4">
            <Card sx={{ width: "full" }} className="relative">
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h1" sx={{ color: '#3b85db', fontSize: "40px" }}>
                            {/* 8 Tampa House */}
                            {capitalize(PropertyData?.data?.propertyName ?? "")}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#212529', fontSize: "20px" }}>
                            {/* Miami, United States */}
                            {capitalize(PropertyData?.data?.location ?? "")}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        sx={{ maxWidth: "100%", height: 500, objectFit: "cover", objectPosition: "center" }}
                        component="img"
                        image={PropertyData?.data?.propertyImage ?? ""}
                        alt="8 Tampa Heights"
                    />
                </CardActionArea>
            </Card>
            <div className="uppercase  text-[#746f6fe3] w-fit border border-[#8f8989e7] px-3 py-1 rounded">
                {PropertyData?.data?.rooms + " Bedroom"}
            </div>
            <p className="text-md text-[#746f6f]">
                {capitalize(PropertyData?.data?.description ?? "")}
            </p>
            <Divider />
            <div className="flex flex-col gap-6">
                <Typography variant="body2" sx={{ color: '#212529', fontSize: "24px" }}>
                    HOST EMAIL
                </Typography>
                <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px" }}>
                    lucie@example.com
                </Typography>
                <div>
                    <Button variant="contained">BOOK NOW</Button>
                </div>
            </div>
            <div className="flex items-center gap-6 py-4 px-6 w-[860px] bg-[#ebe7e7e7] rounded">
                <div className="flex gap-3">
                    <div>
                        <Avatar />
                    </div>
                    <div className="">
                        <Typography variant="body2" sx={{ color: '#3b85db', fontSize: "20px" }}>
                            Lucie
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px" }}>
                            I love skating, eating out and watching YouTube, looking for likeminded folk to live with.
                        </Typography>
                    </div>
                </div>
                <div className="w-fit">
                    <Button variant="contained" size="small">VIEW PROFILE</Button>
                </div>
            </div>
        </div>
    )
}

export default ListingDetails