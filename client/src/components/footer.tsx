import { Button } from "@mui/material"

const Footer = () => {
    return (
        <div className="flex flex-col gap-5 mt-8">
            <div className="flex justify-between items-center py-3 bg-white">
                <h1 className="text-xl text-[#3B85DB]">Rent<span className="text-[#AEAEB5]">.live</span></h1>
                <Button
                    className="uppercase"
                    variant="text">
                    Browse hosts
                </Button>
            </div>
            <hr />
            <div className="flex justify-center items-center py-3">
                <p className="text-lg text-[#AEAEB5]">Made with ❤️ by Irshad.</p>
            </div>
        </div>
    )
}

export default Footer