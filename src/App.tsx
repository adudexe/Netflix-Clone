import { Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/Navbar";
import { VideoPlayer } from "./pages/VideoPlayer";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";


function App() {


  return (
    <>
      <AuthContextProvider>
          <Navbar/>
            <Routes>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<Login/>} />
              
              <Route path="/profile" element={
                <Protected>
                  <Profile/>
                </Protected>
                } />
              <Route path="/" element={
                <Protected>
                  <Home/>
                </Protected>
                }/>
                <Route path="/player/:id" element={
                  <Protected>
                    <VideoPlayer/>
                  </Protected>
                }/>
              

                <Route path="*" element={<NotFound />} />

            </Routes>  
        </AuthContextProvider>
        <ToastContainer 
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
      />
    </>

  )
}

export default App
