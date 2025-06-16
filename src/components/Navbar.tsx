import logo from "../assets/logo.png"
import {Link, useNavigate} from "react-router-dom"
import type { AuthContextType } from "../context/AuthContext"
import { useAuth } from "../context"
export const Navbar = () => {

    const { user,logOut }:AuthContextType = useAuth();
    const navigate = useNavigate();

    const handleLogut = async () => {
       try{
        await logOut();
        navigate("/login");
       } catch(err) {
        console.log("The Error is",err);
       } 
    }

    


  return (
    <div className='absolute w-full p-4 flex iter-center justify-between z-50'> 
        <Link to="/">
            <img src={logo} className='h-4 md:h-8 ' alt="" />
        </Link>

        {
            user?.email ? 
            <div className='flex gap-2'>
            <Link to="/profile">
                <button className='border-1 px-2 py-1 rounded-md cursor-pointer'>Profile</button> 
            </Link>
            <Link to="/login">
                <button onClick={handleLogut} className='bg-red-600 rounded-md px-2 py-1 cursor-pointer' >Logot</button> 
            </Link>
            </div> :
            <div className='flex gap-2'>
                <Link to="/login">
                    <button className='border-1 px-2 py-1 rounded-md cursor-pointer'>Login</button> 
                </Link>
                <Link to="/signup">
                    <button className='bg-red-600 rounded-md px-2 py-1 cursor-pointer' >SignUp</button> 
                </Link>
            </div>
        }

        
    </div>
  )
}
