import HeroSection from "../modules/home/components/hero"
import Listing from "../modules/home/components/listing"
import Trendings from "../modules/home/components/trending"


const Home = () => {
    return (
        <div>
            <HeroSection />
            <Listing />
            <Trendings />
        </div>
    )
}

export default Home