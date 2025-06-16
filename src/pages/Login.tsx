import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useAuth } from "../context";
import type { AuthContextType } from "../context/AuthContext";


export const Login = () => {

  const [remember,setRemember] = useState<boolean>(false);
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  const { logIn }:AuthContextType = useAuth();
  const navigate = useNavigate();

  function validateEmail(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function passwordValidation(){
      return password.length >= 6;
  }


  async function SignUp(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    if(!validateEmail()){
      return toast.error("Please Input a valid email");
    }
    if(!passwordValidation()){
      return toast.error("Please use a password with length greater than 6");
    }

    try{
          await logIn(email,password);
          navigate("/");
      } catch(err){
          const errorCode = (err as any).code;
          const errorMessage = (err as any).message;

          console.log("Login Error Code ",errorCode);
          console.log("Login Error Message",errorMessage);

          if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found" || errorCode == "auth/invalid-credential") {
            toast.error("Invalid email or password. Please try again.");
          } else if (errorCode === "auth/too-many-requests") {
            toast.error("Too many failed attempts. Please try again later.");
          } else {

            toast.error("Login failed: " + errorMessage);
          }
      }
    
  }


  return (
    <>
      <div className='w-full h-full'>
        <img 
        className='hidden sm:block absolute w-full h-full object-cover'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg" 
        alt="background_image" />

        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen">
          <div className="fixed w-full px-4 py-24 z-28">
            <div className="max-w-[458px] h-[600px] mx-auto bg-black/70 rounded-lg">
               <div className="max-w-[328px] mx-auto py-18">
                <h1 className="text-2xl font-bold">Login</h1> 

                <form className="w-full flex flex-col py-4">
                    <input className="my-2 bg-black/65 border border-gray-700 px-2 py-3 rounded-md" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email" />

                    <input className="my-2 bg-black/65 border border-gray-700 px-2 py-3 rounded-md" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password" />

                   <button 
                     onClick={SignUp} 
                     className="p-2 bg-red-600 rounded-md font-bold">Login
                   </button>

                   <div className="flex items-center justify-between">

                    <p className="mt-3 text-gray-200">
                      <input type="checkbox" className="me-1" checked={remember} onChange={() => setRemember(!remember) }/>
                      Remember Me
                    </p>
                    
                    <p>Need Help?</p>
                   </div>
                </form>
                <p>Don't Have an account? <Link to="/login" className="underline">SignUp</Link></p>
               </div> 
            </div>
          </div>
        </div>
      </div>

       {/* <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        theme="dark"
        draggable 
        pauseOnHover 
      /> */}
    </>
  )
}
