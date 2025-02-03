import { Button, TextField } from "@mui/material"
import Heading from "../components/heading"

const Addlisting = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[550px] px-4 py-6 ">
                <Heading>List a space</Heading>
                <form>
                    <div className="flex flex-col gap-4 my-4 bg-[#ffffff]">
                        <TextField
                            required
                            id="outlined-required"
                            label="Listing Name"
                            size="small"
                            autoComplete="off"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Location "
                            size="small"
                            autoComplete="off"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="No. of Bedrooms "
                            size="small"
                            autoComplete="off"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Listing Description"
                            multiline
                            rows={4}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Monthly Listing Price "
                            size="small"
                            autoComplete="off"
                        />
                        <Button variant="contained">Send Application</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addlisting