import Footer from "../components/layout/footer"
import HeroSection from "../modules/home/components/hero"
import Navbar from "../components/layout/navbar"
import Listing from "../modules/home/components/listing"
import Trendings from "../modules/home/components/trending"


const Home = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <Listing />
            <Trendings />
            <Footer />
        </div>
    )
}

export default Home