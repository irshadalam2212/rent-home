import { Button, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"


const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = () => {
        localStorage.setItem("user", "irshad")
        navigate("/home")
    }
    
    return (
        <div className="flex items-center justify-center h-screen w-full bg-[url('/background.svg')]">
            <div className="flex flex-col gap-3 w-[450px] h-[420px] bg-[#f0eeee] px-6 py-8">
                <h1 className="text-4xl text-[#3B85DB] text-center cursor-pointer">Rent<span className="text-[#AEAEB5]">.live</span></h1>
                <h3 className="text-xl text-center">Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 my-4">
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
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
                    <Button variant="contained" type="submit">Sign In</Button>
                </form>
                <p>Don't have an account? {" "} 
                    <Link 
                        to= "/signup"
                        className="text-[#3B85DB]"
                        >Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login