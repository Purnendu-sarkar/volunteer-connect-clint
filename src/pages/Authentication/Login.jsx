import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import SocialLogin from "../shared/SocialLogin";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";


const Login = () => {
  const { signInUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value; 
    const password = form.password.value; 
    console.log(email, password);

    // Attempt to sign in using provided email and password
    signInUser(email, password)
      .then((result) => {
        console.log("Sign in successful:", result.user);
        toast.success("Login successful!");
        form.reset(); 
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign in error:", error);
        toast.error("Invalid email or password!");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Lottie Animation */}
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={loginLottie} />
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          {/* Link to Register Page */}
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="link text-primary">
              Register here
            </a>
          </p>

          {/* Social Login Component */}
          <SocialLogin />
        </div>
      </div>

      {/* Toast Container for Notifications
      <ToastContainer /> */}
    </div>
  );
};

export default Login;
