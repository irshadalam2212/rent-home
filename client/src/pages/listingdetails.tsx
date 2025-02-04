import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from "@mui/material"

const ListingDetails = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card sx={{ width: "full" }} className="relative">
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h1" sx={{ color: '#3b85db', fontSize: "40px" }}>
                            8 Tampa House
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#212529', fontSize: "20px" }}>
                            Miami, United States
                        </Typography>
                    </CardContent>
                    <CardMedia
                        sx={{ maxWidth: "100%", height: 500, objectFit: "cover", objectPosition: "center" }}
                        component="img"
                        image="/details.jpg"
                        alt="8 Tampa Heights"
                    />
                </CardActionArea>
            </Card>
            <div className="uppercase  text-[#746f6fe3] w-fit border border-[#8f8989e7] px-3 py-1 rounded">
                3 Bedroom
            </div>
            <p className="text-md text-[#746f6f]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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