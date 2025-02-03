import Footer from "../components/footer"
import HeroSection from "../components/hero"
import Listing from "../components/listing"
import Navbar from "../components/navbar"
import Trendings from "../components/trending"

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