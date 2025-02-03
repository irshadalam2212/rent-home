import { Button, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"


const SignUp = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col gap-3 w-[450px] h-[420px] bg-[#f0eeee] px-6 py-8">
                <h1 className="text-4xl text-[#3B85DB] text-center cursor-pointer">Rent<span className="text-[#AEAEB5]">.live</span></h1>
                <h3 className="text-xl text-center">Sign Up</h3>
                <form action="">
                    <div className="flex flex-col gap-4 my-4">
                        <TextField
                            required
                            id="outlined-required"
                            label="Fullname"
                            size="small"
                            autoComplete="off"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            type="email"
                            size="small"
                            autoComplete="off"
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            size="small"
                            autoComplete="off"
                        />
                    </div>
                    <Button variant="contained" type="submit">Sign Up</Button>
                </form>
                {/* <Button variant="outlined" onClick={() => navigate("/login")}>Sign In</Button> */}
                <p>Already have an account? {" "} 
                    <Link 
                        to= "/login"
                        className="text-[#3B85DB]"
                        >Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp