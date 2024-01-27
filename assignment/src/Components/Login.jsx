import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/Authcontext";

const Login = () => {
  const { login } = useAuth();
  const [email, sertEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      sertEmail("");
      setPassword("");
      seterror("");
      navigate("/home");
    } else {
      seterror("Envalid email or password");
      sertEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="flex items-center  w-full  justify-center absolute top-[20%] ">
        <div className="mt-10 sm:mx-auto sm:w-full  w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login in to your account
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  typeof="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => sertEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    typeof="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />{" "}
                  <p>demo email from api</p>
                  <span className="text-xs">
                    email-vcholdcroftg@ucoz.com
                  </span>{" "}
                  <br />
                  <span className="text-xs">pass-mSPzYZfR</span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
