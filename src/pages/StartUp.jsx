import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customercareImg from "../assets/customercare.jpg";
import logo from "../assets/logo.png";
const StartUp = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  // Load saved input from localStorage on component mount
  useEffect(() => {
    const savedInput = localStorage.getItem("startupInput");
    if (savedInput) {
      setTextInput(savedInput);
    }
  }, []);

  // Save to localStorage whenever input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    localStorage.setItem("startupInput", value);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Save the final input to localStorage
    localStorage.setItem("startupInput", textInput);
      
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      // You can add navigation logic here when integrated with your router
      console.log("Navigating to login page...");
      navigate("/home");
    }, 1000);
  };

  const isButtonEnabled = textInput.trim().length > 0;

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-[7em] px-4">
      <div className="w-full max-w-sm bg-white px-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex justify-start mb-5">
            <img
              src={""}
              alt=""
              className="w-24 h-auto rounded-full"
            />
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="flex items-center mb-1 ">
              <img
                src={customercareImg}
                alt=""
                className="w-16 rounded-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-xl font-medium text-gray-800 mb-2">
            Welcome to Grey Global
          </h1>
          <p className="text-sm text-gray-600">
            Kindly write your complaint or request on the box below
          </p>
        </div>

        {/* Text Input Box */}
        <div className="mb-8">
          <div className="border border-gray-300 rounded-lg p-4 min-h-[120px]">
            <textarea
              value={textInput}
              onChange={handleInputChange}
              placeholder="Write your complaint or request here..."
              className="w-full h-full resize-none border-none outline-none placeholder:text-gray-400 text-gray-800"
              rows={4}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Kindly log in to your Grey App to submit your complaint/request.{" "}
            <span className="font-medium">Log in to continue</span>
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          disabled={!isButtonEnabled || loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition-all duration-200 ${
            !isButtonEnabled
              ? "bg-gray-300 cursor-not-allowed"
              : loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          {loading ? "Processing..." : "Login to continue"}
        </button>
      </div>
    </div>
  );
};

export default StartUp;




