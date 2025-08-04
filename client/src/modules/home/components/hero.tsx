import { Box, Button, CardContent, CardMedia, Typography } from "@mui/material"
import HeroImg from "../../../assets/hero.png"

const HeroSection = () => {
    const handleExploreButton = () => {
        window.scrollBy({
            top: window.innerHeight + 120,
            behavior: "smooth"
        })
    }

    return (
        <div className="bg-[url('/background.svg')] h-screen flex items-center justify-center px-6">
            <div className="flex items-center justify-between">
                <Box sx={{ display: 'flex' }}>
                    <CardContent className="flex flex-col items-start justify-center gap-5">
                        <Typography component="div" variant="h5"
                            sx={{ color: "#3b85db", fontWeight: "500", fontSize: "36px" }}
                        >
                            Find Co-living spaces
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'black', fontSize: "16px" }}
                        >
                            Homes, Shops,  Offices and Lands — All in One Place
                        </Typography>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => handleExploreButton()}
                        >
                            Explore Listing
                        </Button>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 500 }}
                    image={HeroImg}
                    alt="Live from space album cover"
                />
            </div>
        </div>
    )
}

export default HeroSection