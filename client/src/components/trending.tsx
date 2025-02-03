import Heading from "./heading"
import { trendingLocations } from "../data"
import { Button, Card, CardActionArea, CardMedia, Stack, Typography } from "@mui/material"

const Trendings = () => {
    return (
        <div>
            <Heading>
                Explore trending locations
            </Heading>
            <div className="grid grid-cols-3 gap-3 mb-12">
                {
                    trendingLocations.map((loc) => (
                        <Card sx={{ maxWidth: 400 }}>
                            <CardActionArea>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    component="img"
                                    image={loc.image}
                                    alt={loc.location}
                                />
                                <Stack sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {loc.location}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px" }}>
                                        {loc.about}
                                    </Typography>
                                    <Button>Explore</Button>
                                </Stack>
                            </CardActionArea>
                        </Card>
                    ))
                }
            </div>
            <div className="bg-[#3B85DB] bg bg-[url('/background.svg')] h-96 z-0 flex flex-col items-center justify-center gap-5">
                <h1 className="text-4xl font-semibold text-white">Stay Updated</h1>
                <input
                    className="outline-none px-2 py-1 bg-transparent border border-white text-white rounded-sm"
                    type="email"
                    placeholder="Email"
                />
                <button className="text-white border border-white px-3 py-2 rounded-sm">
                    Subscribe
                </button>
            </div>
        </div>
    )
}

export default Trendings