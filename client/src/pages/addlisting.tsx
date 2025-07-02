
import Heading from "../components/shared/heading"
import { Controller, useForm } from "react-hook-form";
import { IGetPropertyValue } from "../modules/property/models/property.models";
import { useGetPropertById, usePostProperty, useUpdateProperty } from "../modules/property/hooks/property.queries";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Form, FormItem, Input, Notification, Radio, toast, Upload } from "../components/ui";
import FileItem from "../components/ui/Upload/FileItem";
import CloseButton from "../components/ui/CloseButton";

const Addlisting = () => {
    // const navigate = useNavigate()
    // const location = useLocation();
    const [searchParams] = useSearchParams();
    const encodedId = searchParams.get('propertyId');

    // const decodedId = encodedId ? atob(decodeURIComponent(encodedId)) : null;

    // Now you can use `decodedId` to fetch or update data
    // console.log('Original propertyId:', decodedId);
    const {
        control,
        handleSubmit,
        setValue,
    } = useForm<IGetPropertyValue>();

    const { mutateAsync: PostProperty, isLoading: PostingPropertyIsLoading } = usePostProperty()
    const { data: PropertyData, isLoading: PropertyDataIsLoading } = useGetPropertById(encodedId ?? "");
    const { mutateAsync: UpdateProperty, isLoading: UpdateProperyIsLoading } = useUpdateProperty()

    useEffect(() => {
        if (PropertyData?.data && !PropertyDataIsLoading) {
            setValue("propertyName", PropertyData?.data?.propertyName)
            setValue("location", PropertyData?.data?.location)
            setValue("rooms", PropertyData?.data?.rooms)
            setValue("description", PropertyData?.data?.description)
            setValue("rent", PropertyData?.data?.rent)
            setValue('propertyType', PropertyData?.data?.propertyType);
            if (PropertyData?.data?.propertyImage) {
                setValue("propertyImage", [
                    {
                        file: PropertyData?.data?.propertyImage,
                        name: "xyz"
                    }
                ])
            }
        }
    }, [PropertyData])


    // const handleCreateProperty = async (value: IGetPropertyValue) => {
    //     // console.log(value, "Value")
    //     const formData = new FormData();
    //     formData.append("propertyName", value.propertyName ?? "");
    //     formData.append("rooms", value.rooms?.toString() ?? "");
    //     formData.append("rent", value.rent?.toString() ?? "");
    //     formData.append("propertyType", value.propertyType ?? "");
    //     formData.append("location", value.location ?? "");
    //     formData.append("description", value.description ?? "");
    //     formData.append("propertyImage", value.propertyImage?.[0]);


    //     // {I have not craeted the payload for updation because the payload for add and update is same i am extracting id from the params }
    //     // const updatePropertyFormData = new FormData()
    //     // updatePropertyFormData.append("propertyName", value.propertyName ?? "");
    //     // updatePropertyFormData.append("rooms", value.rooms?.toString() ?? "");
    //     // updatePropertyFormData.append("rent", value.rent?.toString() ?? "");
    //     // updatePropertyFormData.append("propertyType", value.propertyType ?? "");
    //     // updatePropertyFormData.append("location", value.location ?? "");
    //     // updatePropertyFormData.append("description", value.description ?? "");
    //     // updatePropertyFormData.append("propertyImage", value.propertyImage?.[0]);

    //     try {
    //         const response = await encodedId ? UpdateProperty(formData) : PostProperty(formData);
    //         toast.push(
    //             <Notification type="success" duration={3000}>
    //                 {response?.message}
    //             </Notification>,
    //             {
    //                 placement: "top-end"
    //             }
    //         )
    //     } catch (error: any) {
    //         console.log("Upload error:", error);
    //         toast.push(
    //             <Notification type="danger" duration={3000}>
    //                 {error?.message}
    //             </Notification>,
    //             {
    //                 placement: 'top-end',
    //             },
    //         )
    //     }
    // };

    const handleCreateProperty = async (value: IGetPropertyValue) => {
        const formData = new FormData();

        // Append form data fields with nullish coalescing and safe optional chaining
        formData.append("propertyName", value.propertyName ?? "");
        formData.append("rooms", value.rooms?.toString() ?? "");
        formData.append("rent", value.rent?.toString() ?? "");
        formData.append("propertyType", value.propertyType ?? "");
        formData.append("location", value.location ?? "");
        formData.append("description", value.description ?? "");

        // Only append file if it exists
        if (value.propertyImage?.[0]) {
            formData.append("propertyImage", value.propertyImage[0]);
        }

        try {
            // Decide API based on `encodedId` presence
            const response = encodedId
                ? await UpdateProperty(formData)  // Ensure decoded ID is passed if required
                : await PostProperty(formData);

            toast.push(
                <Notification type="success" duration={3000}>
                    {response?.message ?? "Operation successful"}
                </Notification>,
                { placement: "top-end" }
            );
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.push(
                <Notification type="danger" duration={3000}>
                    {error?.message ?? "Something went wrong"}
                </Notification>,
                { placement: "top-end" }
            );
        }
    };

    return (
        <div className="flex items-center justify-center w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[750px] px-4 py-6">
                <Heading>List a space</Heading>
                <Form onSubmit={handleSubmit(handleCreateProperty)} >
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
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Upload
                                            draggable
                                            fileList={value || []}
                                            showList={false}
                                            uploadLimit={1}
                                            onChange={(files) => {
                                                if (files.length > 0) {
                                                    const newFile = files[0];
                                                    if (newFile instanceof File) {
                                                        onChange([{ file: newFile, name: newFile.name }]);
                                                    }
                                                }
                                                else {
                                                    onChange([]);
                                                }
                                            }}
                                        />
                                        {value && value.length > 0 && (
                                            <FileItem
                                                file={value[0].file ? value[0].file : ""}
                                                usedFor="group-media"
                                                className="mt-2 md:w-full w-64 relative"
                                            >
                                                <div className="flex w-full lg:w-fit justify-end absolute right-0">
                                                    <CloseButton
                                                        className="upload-file-remove hover:!bg-red-200"
                                                        onClick={() => {
                                                            setValue("propertyImage", [], { shouldValidate: true });
                                                        }}
                                                    />
                                                </div>
                                            </FileItem>
                                        )}
                                    </>
                                )}
                            />
                        </FormItem>
                        <Button
                            type="submit"
                            variant="default"
                            disabled={PostingPropertyIsLoading || UpdateProperyIsLoading}
                        >
                            Send Application
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Addlisting