import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import registerLottie from "../../assets/lottie/register.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Register Component
const Register = () => {
  const { createUser, signOutUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form submission handler
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Password validation
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Call the createUser function from AuthContext
    createUser(email, password, name, photoURL)
      .then((user) => {
        console.log("User created successfully:", user);
        toast.success("Registration successful!");
        form.reset();
        signOutUser();
        navigate("/logIn");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Helmet>
        <title>Register | Volunteer</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Lottie Animation */}
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={registerLottie}></Lottie>
        </div>

        {/* Registration Form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="Photo URL"
                className="input input-bordered"
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
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <p className="text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="link text-primary">
                  Login here.
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>

          {/* Social Login Component */}
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
