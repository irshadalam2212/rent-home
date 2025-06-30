
import Heading from "../components/shared/heading"
import { Controller, useForm } from "react-hook-form";
import { IGetPropertyValue } from "../modules/property/models/property.models";
import { useGetPropertById, usePostProperty } from "../modules/property/hooks/property.queries";
// import { useNavigate } from "react-router-dom";
// import { Upload } from "../components/layout/upload/upload";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button, Form, FormItem, Input, Radio, Upload } from "../components/ui";

const Addlisting = () => {
    // const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedId = queryParams.get('propertyId');
    const decodedId = encodedId ? atob(decodeURIComponent(encodedId)) : "";
    const {
        control,
        handleSubmit,
        setValue,
        watch
    } = useForm<IGetPropertyValue>();

    const propertyImage = watch('propertyImage')
    const { mutateAsync: PostProperty, isLoading: PostingPropertyIsLoading } = usePostProperty()
    const { data: PropertyData, isLoading: PropertyDataIsLoading } = useGetPropertById(decodedId);


    useEffect(() => {
        if (PropertyData?.data && !PropertyDataIsLoading) {
            setValue("propertyName", PropertyData?.data?.propertyName)
            setValue("location", PropertyData?.data?.location)
            setValue("rooms", PropertyData?.data?.rooms)
            setValue("description", PropertyData?.data?.description)
            setValue("rent", PropertyData?.data?.rent)
            setValue('propertyType', PropertyData?.data?.propertyType);
            setValue("propertyImage", PropertyData?.data?.propertyImage)
        }
    }, [PropertyData])


    const handleCreateProperty = async (value: IGetPropertyValue) => {
        console.log(value, "Value")
        const formData = new FormData();
        formData.append("propertyName", value.propertyName ?? "");
        formData.append("rooms", value.rooms?.toString() ?? "");
        formData.append("rent", value.rent?.toString() ?? "");
        formData.append("propertyType", value.propertyType ?? "");
        formData.append("location", value.location ?? "");
        formData.append("description", value.description ?? "");
        formData.append("propertyImage", value.propertyImage);

        try {
            const response = await PostProperty(formData);
            console.log(response)
            // navigate("/home");
        } catch (error) {
            console.log("Upload error:", error);
        }
    };

    // const onFilesChange = (newFiles: File[]) => {
    //     const isBlobFiles = newFiles?.filter((item) => typeof item != 'string')
    //     const updatedFiles = isBlobFiles?.map((file) => {
    //         const fileName = file?.name?.split(".")?.[0]
    //         // const activeIndex = index + 1

    //         return {
    //             file,
    //             fileName,
    //             uploaded_date: "",
    //         }
    //     })
    //     setValue('propertyImage', [...propertyImage, ...updatedFiles], {
    //         shouldValidate: true,
    //     })
    // }


    return (
        <div className="flex items-center justify-center w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[750px] px-4 py-6">
                <Heading>List a space</Heading>
                <form onSubmit={handleSubmit(handleCreateProperty)} >
                    <div className="flex flex-col">
                        <FormItem
                            label="Property Name"
                        >
                            <Controller
                                name="propertyName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        required
                                        size="sm"
                                        autoComplete="off"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Location"
                        >
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        required
                                        size="sm"
                                        autoComplete="off"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="No. of Bedrooms"
                        >
                            <Controller
                                control={control}
                                name="rooms"
                                render={({ field }) => (
                                    <Input
                                        required
                                        size="sm"
                                        autoComplete="off"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Listing Description"
                        >

                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <Input
                                        textArea
                                        rows={4}
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Monthly Listing Price"
                        >
                            <Controller
                                control={control}
                                name="rent"
                                render={({ field }) => (
                                    <Input
                                        required
                                        type="number"
                                        size="sm"
                                        autoComplete="off"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            asterisk
                            label="Property Type"
                        >
                            <Controller
                                name="propertyType"
                                control={control}
                                render={({ field }) =>
                                    <Radio.Group {...field}>
                                        <Radio value={'apartment'}>Apartment</Radio>
                                        <Radio value={'house'}>house</Radio>
                                        <Radio value={'commercial'}>Commercial</Radio>
                                        <Radio value={'land'}>Land</Radio>
                                    </Radio.Group>
                                }
                            />
                        </FormItem>
                        <FormItem
                            asterisk
                            label="Upload Image"
                        >
                            <Controller
                                name="propertyImage"
                                control={control}
                                rules={{ required: "File is required" }}
                                render={({ field: { onChange } }) => (
                                    <Upload
                                        draggable
                                        fileList={[]}
                                        // showList={false}
                                        accept="image/*"
                                        multiple
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </FormItem>
                        <Button type="submit" variant="default" >Send Application</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addlisting