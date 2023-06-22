import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, img: data.photoURL }
                        fetch('https://assignment-12-server-eosin-alpha.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })
    };

    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordInput, setPasswordInput] = useState({
        password: '',
        confirmPassword: ''
    })
    const handlePasswordChange = (event) => {
        const passwordInputValue = event.target.value;
        const passwordInputFieldName = event.target.name;
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue }
        setPasswordInput(NewPasswordInput);
    }
    const handleValidation = (event) => {
        const passwordInputValue = event.target.value;
        const passwordInputFieldName = event.target.name;
        if (passwordInputFieldName === "confirm" || (passwordInputFieldName === "password" && passwordInput.confirmPassword.length > 0)) {

            if (passwordInput.confirmPassword !== passwordInput.password) {
                setConfirmPasswordError("Confirm password is not matched");
            } else {
                setConfirmPasswordError("Password Matched");
            }

        }
    }
    return (
        <div>
            <h1 className="text-4xl font-bold font-serif text-center mt-5">Register</h1>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-7 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold font-serif">Name</span>
                        </label>
                        <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold font-serif">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold font-serif">Password</span>
                        </label>
                        <input type="password"  {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                        })} placeholder="password" name="password" onChange={handlePasswordChange} className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have at least one Uppercase one and one special character.</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold font-serif">Confirm Password</span>
                        </label>
                        <input type="password"  {...register("confirm", {
                            required: true,
                        })} placeholder="confirm password" name="confirm" onChange={handlePasswordChange} onKeyUp={handleValidation} className="input input-bordered" />
                        <p className="text-red-600">{confirmPasswordError}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold font-serif">Photo URL</span>
                        </label>
                        <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-orange-300 font-semibold font-serif" type="submit" value="Register" />
                    </div>
                </form>
                <p className="text-center font-italic font-serif mb-5"><small>Already have an account? Then please <Link to="/login">Login</Link></small></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
}
export default Register;