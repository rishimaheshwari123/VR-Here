import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import NavbarContainer from "../components/common/Navbar/Navbar";
import Footer from "../components/common/footer/Footer";
import { createContact } from "../service/operations/user";
import Loading from "../components/common/Loading";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await dispatch(createContact(data));
    setLoading(false);
    if (res) {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavbarContainer />

      <div className="flex-grow flex items-center justify-center py-8 px-4">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full border border-gray-300 rounded-md p-2 ${
                    errors.name ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Entered value does not match email format",
                    },
                  })}
                  className={`w-full border border-gray-300 rounded-md p-2 ${
                    errors.email ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact" className="block text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  type="text"
                  {...register("contact", {
                    required: "Contact number is required",
                  })}
                  className={`w-full border border-gray-300 rounded-md p-2 ${
                    errors.contact ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                  })}
                  className={`w-full border border-gray-300 rounded-md p-2 ${
                    errors.message ? "border-red-500" : "focus:border-blue-500"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
