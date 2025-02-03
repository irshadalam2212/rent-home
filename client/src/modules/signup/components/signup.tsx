import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useRegisteruser } from "../hooks/signup.queries"
import { IUserRegistrationResponse } from "../models/signup.interface"


const SignUp = () => {
    const navigate = useNavigate()
    const [response, setResponse] = useState()
    const { mutateAsync: RegisterUser, isLoading: RegisterUserIsLoading } = useRegisteruser();

    const { control, handleSubmit } = useForm<IUserRegistrationResponse>({ 
        defaultValues: {

        }});

    const registerUser = async (values: any) => {
        try {
            const response = await RegisterUser(values)
            response?.data ? setResponse(response?.data) : {}
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(response, "Response")

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col gap-3 w-[450px] h-[420px] bg-[#f0eeee] px-6 py-8">
                <h1 className="text-4xl text-[#3B85DB] text-center cursor-pointer">Rent<span className="text-[#AEAEB5]">.live</span></h1>
                <h3 className="text-xl text-center">Sign Up</h3>
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="flex flex-col gap-4 my-4">
                        <Controller
                            name="userName"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    size="small"
                                    autoComplete="off"
                                />
                            }
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    type="email"
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
                    <Button variant="contained" disabled={RegisterUserIsLoading} type="submit">Sign Up</Button>
                </form>
                {/* <Button variant="outlined" onClick={() => navigate("/login")}>Sign In</Button> */}
                <p>Already have an account? {" "}
                    <Link
                        to="/login"
                        className="text-[#3B85DB]"
                    >Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp