
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { usePostFetchUser } from "../hooks/login.queries"
import { IFetchUserPayload } from "../models/login.interface"
import Loader from "../../../components/shared/loader"
import { Button, Input } from "../../../components/ui"
import PasswordInput from "../../../components/ui/Input/passwordinput"



const Login = () => {
    const navigate = useNavigate()
    const { mutateAsync: PostFetchUser, isLoading: PostFetchUserIsLoading } = usePostFetchUser();

    const { control, handleSubmit } = useForm<IFetchUserPayload>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSignIn = async (values: any) => {
        // console.log(values, "Value")
        const payload = {
            email: values.email,
            password: values.password
        }
        try {
            const response = await PostFetchUser(payload)
            localStorage.setItem("token", response?.data?.accessToken)
            PostFetchUserIsLoading ? <Loader /> : navigate("/home")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col gap-3 w-[450px] h-[420px] bg-gray-200 px-6 py-8 rounded-xl">
                <h1 className="text-4xl text-primary text-center">Urban<span className="text-gray-400">Lease</span></h1>
                <h3 className="text-xl text-center text-gray-600">Sign In</h3>
                <form onSubmit={handleSubmit(onSignIn)}>
                    <div className="flex flex-col gap-4 my-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    {...field}
                                    required
                                    id="outlined-required"
                                    placeholder="Email"
                                    size="sm"
                                    autoComplete="off"
                                />
                            }
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) =>
                                <PasswordInput
                                    {...field}
                                    required
                                    type="text"
                                    id="outlined-password-input"
                                    placeholder="Password"
                                    size="sm"
                                    autoComplete="off"
                                />
                            }
                        />

                    </div>
                    <Button
                        variant="solid"
                        type="submit"
                        size="sm"
                        disabled={PostFetchUserIsLoading}
                    >
                        Sign In
                    </Button>
                </form>
                <p>Don't have an account? {" "}
                    <Link
                        to="/signup"
                        className="text-[#3B85DB]"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login