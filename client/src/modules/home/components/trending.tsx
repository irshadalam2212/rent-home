
import Heading from "../../../components/shared/heading"

import { Card, CardActionArea, CardMedia, Stack, Typography } from "@mui/material"
import { trendingLocations } from "../../../data"
import { Button, Input } from "../../../components/ui"

const Trendings = () => {
    return (
        <div>
            <Heading>
                Explore trending locations
            </Heading>
            <div className="grid grid-cols-3 gap-3 mb-12">
                {
                    trendingLocations.map((loc) => (
                        <Card sx={{ maxWidth: 400 }} >
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
                                    <Button size="sm" className="mt-2">Explore</Button>
                                </Stack>
                            </CardActionArea>
                        </Card>
                    ))
                }
            </div>
            <div className="bg-[#3B85DB] bg bg-[url('/background.svg')] h-96 z-0 flex flex-col items-center justify-center gap-5">
                <h1 className="text-4xl font-semibold text-white">Stay Updated</h1>
                <Input
                    className="w-[400px]"
                    type="email"
                    size="sm"
                    placeholder="Email"
                />
                <Button
                    size="sm"
                    variant="default"
                >
                    Subscribe
                </Button>
            </div>
        </div>
    )
}

export default Trendings