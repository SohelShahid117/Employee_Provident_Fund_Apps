import React, { useState } from "react";
import axios from './../../node_modules/axios/lib/axios';

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError] = useState(null)
    // console.log(email)
    // console.log(password)

    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        // alert("ok")
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",{email,password})
            console.log(response)
            if(response.data.success){
                alert("successfully login")
                setError(null)
            }

        }catch(err){
            console.log(err)
            if(err.response && !err.response.data.success){
                setError(err.response.data.error)
            }else{
                setError("server error")
            }
        }
    }

  return (
    <div className="flex flex-col items-center justify-center bg-teal-600  space-y-6">
      <h2 className="font-serif text-3xl text-white py-5">
        Employee Provident Fund and Loan Management System
      </h2>

      <div className="border bg-white shadow p-6 w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-600 text-2xl">{error}</p>}
        <form action="" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-xl py-1">
              Email
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border"
              placeholder="type your email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-xl py-1"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="type your password"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="" className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox mt-1" />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forget Password
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 text-2xl"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
