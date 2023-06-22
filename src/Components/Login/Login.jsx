import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    return (
        <div>
            <h2 className="text-4xl font-bold font-serif text-center mt-5">Login</h2>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-7 mx-auto">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="font-semibold font-serif">Email</label>
                        <input className="mt-1 input input-bordered" type="email" name="email" placeholder="Enter your Email" required />
                    </div>
                    <div className="form-control mt-5">
                        <label className="font-semibold font-serif">Password</label>
                        <input className="mt-1 input input-bordered" type={passwordType} name="password" placeholder="Enter your Password" required />
                        <label className="btn mt-4" onClick={() => togglePassword()}>
                            {passwordType === "password" ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                        </label>
                    </div>
                    <input className="my-4 btn bg-orange-300 font-semibold font-serif" type="submit" value="Login" />
                </form>
                <p className="text-center font-italic font-serif mb-5"><small>Don't have an account? <Link to="/register">Register</Link></small></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
}
export default Login;