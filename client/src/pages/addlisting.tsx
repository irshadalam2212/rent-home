import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material"
import Heading from "../components/shared/heading"
import { Controller, useForm } from "react-hook-form";

const Addlisting = () => {
    const {
        control,
        handleSubmit,
        // formState: { errors }
    } = useForm();


    const handleCreateProperty = (value: any) => {
        console.log("FormData to send:", value);

    };

    return (
        <div className="flex items-center justify-center w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[750px] px-4 py-6 ">
                <Heading>List a space</Heading>
                <form onSubmit={handleSubmit(handleCreateProperty)} encType="multipart/form-data">
                    <div className="flex flex-col gap-4 my-4 bg-[#ffffff]">
                        <Controller
                            name="propertyName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Listing Name"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Location"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="rooms"
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="No. of Bedrooms "
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Listing Description"
                                    multiline
                                    rows={4}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="rent"
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Monthly Listing Price "
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                        <FormControl>
                            <FormLabel id="property-type-label">Property Type</FormLabel>
                            <Controller
                                name="propertyType"
                                control={control}
                                rules={{ required: 'Property type is required' }}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        aria-labelledby="property-type-label"
                                        row
                                    >
                                        <FormControlLabel value="apartment" control={<Radio />} label="Apartment" />
                                        <FormControlLabel value="house" control={<Radio />} label="House" />
                                        <FormControlLabel value="commercial" control={<Radio />} label="Commercial" />
                                        <FormControlLabel value="land" control={<Radio />} label="Land" />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="propertyImage">Upload Image</FormLabel>
                            <Controller
                                name="propertyImage"
                                control={control}
                                // rules={{ required: 'Image is required' }}
                                render={({ field: { onChange, ref } }) => (
                                    <>
                                        <Input
                                            type="file"
                                            id="propertyImage"
                                            inputProps={{ accept: 'image/*' }}
                                            onChange={(e) => {
                                                onChange(e); // or e.target.files[0] if single file
                                            }}
                                            inputRef={ref}
                                        />
                                    </>
                                )}
                            />
                        </FormControl>
                        <Button type="submit" variant="contained">Send Application</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addlisting