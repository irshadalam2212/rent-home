import { Controller, useForm } from "react-hook-form"
import { Button, Form, FormItem, Input, Notification, Select, toast } from "../components/ui"
import { userRoles } from "../data/roles"
import { useLocation, useNavigate } from "react-router-dom"
import { IPostUserFormData } from "../modules/users/models/user.interface"
import { useGetUserById, useUpdateUser } from "../modules/users/hooks/user.hooks"
import { useEffect } from "react"

const UserDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location?.state || {}
    const userId = state?.id
    const { control, handleSubmit, setValue } = useForm<IPostUserFormData>({
        defaultValues: {

        }
    })

    //-----------------hooks-------------//
    const {
        data: GetUserByIdData,
        isLoading: GetUserByIdDataIsLoading
    } = useGetUserById(userId)

    const { mutateAsync: UpdateUser, isLoading: UserUpdateIsLoading } = useUpdateUser()

    const onSubmit = async (data: IPostUserFormData) => {
        const payload = {
            name: data.name ?? "",
            email: data?.email ?? "",
            userRole: data?.userRole?.value ?? ""
        }
        if (userId) {
            try {
                const response = await UpdateUser({
                    payload,
                    userId
                });
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
        }
    }

    useEffect(() => {
        if (!GetUserByIdDataIsLoading && GetUserByIdData?.data) {
            const userData = GetUserByIdData?.data
            setValue("name", userData?.name)
            setValue("email", userData?.email)
            setValue(
                "userRole",
                userRoles.find(user => user.value === userData?.userRole) ?? null
            );
        }
    }, [GetUserByIdData])

    return (
        <div className="mt-6 min-h-screen">
            <h3 className="mb-4">Edit User</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                    <FormItem
                        asterisk
                        label="Name"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    required
                                    size="sm"
                                    placeholder="Name"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="Email"
                    >
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <Input
                                    required
                                    size="sm"
                                    placeholder="Email"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Role"
                        asterisk
                    >
                        <Controller
                            control={control}
                            name="userRole"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    required
                                    size="sm"
                                    placeholder="Role"
                                    options={userRoles}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <Button
                        size="sm"
                        type="button"
                        variant="default"
                        onClick={() => navigate(-1)}
                        disabled={UserUpdateIsLoading}
                    >
                        Back
                    </Button>
                    <Button
                        size="sm"
                        type="submit"
                        variant="solid"
                        disabled={UserUpdateIsLoading}
                    >
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default UserDetails
