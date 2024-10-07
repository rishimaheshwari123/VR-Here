import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";

const BecomeVendor = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabName = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="relative overflow-y-hidden">
      <div className="flex justify-center my-4">
        <Link
          className="px-4 py-2   text-white bg-black text-xl"
          to="https://www.vrhere.in"
        >
          Home
        </Link>

        <button
          onClick={() => handleTabName("login")}
          className={`px-4 py-2 ${
            activeTab === "login"
              ? "bg-yellow-600 text-black text-xl"
              : "bg-black text-xl text-white"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => handleTabName("register")}
          className={`px-4 py-2 ${
            activeTab === "register"
              ? "bg-yellow-600 text-black text-xl"
              : "bg-black text-xl text-white"
          }`}
        >
          Register
        </button>
      </div>

      {/* Sliding container */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${activeTab === "login" ? "0" : "-100%"})`,
          }}
        >
          <div className="w-full flex-shrink-0">
            <Login />
          </div>
          <div className="w-full flex-shrink-0">
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeVendor;
