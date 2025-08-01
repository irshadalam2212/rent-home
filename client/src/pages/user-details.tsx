import { Controller, useForm } from "react-hook-form"
import { Button, Form, FormItem, Input, Select } from "../components/ui"
import { userRoles } from "../data/roles"
import { useNavigate } from "react-router-dom"
import { IPostUserData } from "../modules/users/models/user.interface"

const UserDetails = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm<IPostUserData>({
        defaultValues: {

        }
    })

    const onSubmit = async (data: IPostUserData) => {
        console.log(data)
    }

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
                    >
                        Back
                    </Button>
                    <Button
                        size="sm"
                        type="submit"
                        variant="solid"
                    >
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default UserDetails
