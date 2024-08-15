import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../service/operations/user";
import Loading from "../components/common/Loading";
function Login() {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(email, password, navigate));
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="w-full max-w-sm p-8   rounded-lg border border-gray-300 shadow-2xl shadow-yellow-600">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-3 bg-yellow-600 text-white px-4 py-3 rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-lg font-medium"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
