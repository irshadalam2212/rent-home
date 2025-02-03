import { Button, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { usePostFetchUser } from "../hooks/login.queries"
import { useState } from "react"
import { IFetchUserPayload } from "../models/login.interface"


const Login = () => {
    const navigate = useNavigate()
    const [response, setResponse] = useState<any>();
    const { mutateAsync: PostFetchUser, isLoading: PostFetchUserIsLoading } = usePostFetchUser();

    const { control, handleSubmit } = useForm<IFetchUserPayload>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSignIn = async (values: any) => {
        console.log(values, "Value")
        const payload = {
            email: values.email,
            password: values.password
        }
        try {
            const response = await PostFetchUser(payload)
            response?.data?.user ? setResponse(response?.data?.user) : {}
        } catch (error) {
            console.log(error)
        }
        localStorage.setItem("token", response?.accessToken)
        navigate("/home")
    }

    return (
        <div className="flex items-center justify-center h-screen w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[450px] h-[420px] bg-[#f0eeee] px-6 py-8">
                <h1 className="text-4xl text-[#3B85DB] text-center cursor-pointer">Rent<span className="text-[#AEAEB5]">.live</span></h1>
                <h3 className="text-xl text-center">Sign In</h3>
                <form onSubmit={handleSubmit(onSignIn)}>
                    <div className="flex flex-col gap-4 my-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    size="small"
                                    autoComplete="off"
                                />
                            }
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    size="small"
                                    autoComplete="off"
                                />
                            }
                        />

                    </div>
                    <Button
                        variant="contained"
                        type="submit"
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