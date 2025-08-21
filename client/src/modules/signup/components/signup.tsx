
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useRegisteruser } from "../hooks/signup.queries"
import { IPostUserPayload } from "../models/signup.interface"
import { Button, Input } from "../../../components/ui"
import PasswordInput from "../../../components/ui/Input/passwordinput"


const SignUp = () => {
    const navigate = useNavigate()
    // const [response, setResponse] = useState()
    const { mutateAsync: RegisterUser, isLoading: RegisterUserIsLoading } = useRegisteruser();

    const { control, handleSubmit } = useForm<IPostUserPayload>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const registerUser = async (values: IPostUserPayload) => {
        try {
            const response = await RegisterUser(values)
            console.log(response, "Response")
            // response?.data ? setResponse(response?.data) : {}
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col gap-3 w-[450px] h-[420px] bg-gray-200 px-6 py-8 rounded-xl">
                <h1 className="text-4xl text-primary text-center">Urban<span className="text-gray-400">Lease</span></h1>
                <h3 className="text-xl text-center text-gray-600">Sign Up</h3>
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="flex flex-col gap-4 my-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    {...field}
                                    required
                                    id="outlined-required"
                                    placeholder="Name"
                                    size="sm"
                                    autoComplete="off"
                                />
                            }
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    {...field}
                                    required
                                    id="outlined-required"
                                    placeholder="Email"
                                    type="email"
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
                                    id="outlined-password-input"
                                    placeholder="Password"
                                    type="text"
                                    size="sm"
                                    autoComplete="off"
                                />
                            }
                        />


                    </div>
                    <Button variant="solid" disabled={RegisterUserIsLoading} type="submit">Sign Up</Button>
                </form>
                {/* <Button variant="outlined" onClick={() => navigate("/login")}>Sign In</Button> */}
                <p>Already have an account? {" "}
                    <Link
                        to="/login"
                        className="text-primary"
                    >Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp