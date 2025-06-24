import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material"
import Heading from "../components/shared/heading"
import { Controller, useForm } from "react-hook-form";
import { IGetPropertyValue } from "../modules/property/models/property.models";
import { usePostProperty } from "../modules/property/hooks/property.queries";
// import { useNavigate } from "react-router-dom";
import { Upload } from "../components/layout/upload/upload";

const Addlisting = () => {
    // const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        // formState: { errors }
    } = useForm<IGetPropertyValue>();

    const { mutateAsync: PostProperty, isLoading: PostingPropertyIsLoading } = usePostProperty()

    const handleCreateProperty = async (value: IGetPropertyValue) => {
        console.log(value, "value")
        console.log('Is File?', value.propertyImage instanceof File); // Should be true
        const formData = new FormData();
        formData.append("propertyName", value.propertyName ?? "");
        formData.append("rooms", value.rooms?.toString() ?? "");
        formData.append("rent", value.rent?.toString() ?? "");
        formData.append("propertyType", value.propertyType ?? "");
        formData.append("location", value.location ?? "");
        formData.append("description", value.description ?? "");
        formData.append("propertyImage", value.propertyImage);

        try {
            // if (value.propertyImage instanceof File) {
            // } else {
            //     console.warn("propertyImage is not a File:", value.propertyImage);
            // }
            // // Inspect what's in FormData
            // for (const [key, val] of formData.entries()) {
            //     console.log(`${key}:`, val);
            // }

            const response = await PostProperty(formData);
            console.log(response)
            // navigate("/home");
        } catch (error) {
            console.error("Upload error:", error);
        }
    };


    return (
        <div className="flex items-center justify-center w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[750px] px-4 py-6 ">
                <Heading>List a space</Heading>
                <form onSubmit={handleSubmit((handleCreateProperty))} >
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
                            {/* <Controller
                                name="propertyImage"
                                control={control}
                                // defaultValue={null}
                                render={({ field: { onChange, onBlur, ref } }) => (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = e.target.files?.[0];
                                            console.log("Selected file:", file); // ✅ Should show File
                                            onChange(file); // ✅ this sets it in the form state
                                        }}
                                        onBlur={onBlur}
                                        ref={ref}
                                    />
                                )}
                            /> */}
                            <Controller
                                name="propertyImage"
                                control={control}
                                rules={{ required: "File is required" }}
                                render={({ field: { onChange } }) => (
                                    <Upload
                                        label="Upload your image"
                                        accept="image/*"
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" disabled={PostingPropertyIsLoading}>Send Application</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addlisting