import { useState } from "react";
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context";
import { db } from "../firebase";
import { updateDoc,doc, arrayUnion, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface Movie {
    id:string;
    title:string;  
    backdrop_path:string;  
    overview:string;
    release_date:string;
    poster_path:string
}

interface data {
  movie : Movie
}

export const MovieItem = ({movie}:data) => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [like,setLike] = useState<boolean>(false); 

  const likedMovie = async () => {
     try{
        const email = user?.email; 
        if(email){
          const userDoc = doc(db,"users",email);
          setLike(!like);
          await updateDoc(userDoc , {
            favShows:arrayUnion({...movie}),
          })
          toast.success("Movie Successfully added");
        } else {
          toast.error("Please login to add movies");
        }
     }catch(err) {
      console.log("Error is ",err);
     }
  }

  //Pending Should need to fix immediatly
  const removeMovie = async () => {
    const email = user?.email;
    if(!email){
      toast.error("Login to remove movies");
      return;
    }

    try{
      const userDocRef = doc(db,"users",email);
      const docSnap = await getDoc(userDocRef);

      const existingFavs:Movie[] = docSnap.data()?.favShows || [];


      const updatedFavs = existingFavs.filter((fav:Movie) => fav.id !== movie.id);

      await updateDoc(userDocRef,{
        favShows:updatedFavs,
      });
      
      setLike(!like);
      toast.success("Movie Succesfully Removed");

    } catch(err){
      console.log("Error removing movie -",err);
      toast.error("Something went wrong");
    }
  }

  function openVideo(id:string){
    navigate(`/player/${id}`);
  }
  

  return (
    
    <div onClick={() => openVideo(movie?.id)} className=" relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[288px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
        <img
         className="w-full h-48 block object-cover object-top"
         src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}`}  
         alt={movie.title} />

        <div className="absolute top-0 left-0 w-full h-full bg-black/60 opacity-0 hover:opacity-100">
          <p className="whitespace-normal text-xl md:test-sm flex justify-center items-center h-full font-bold">
            {movie.title}
          </p> 
            <p>{like ? 
              <FaHeart
              onClick={removeMovie} 
              size={28}
              className="absolute top-2 left-2 text-gray-300"
             /> : 
             <FaRegHeart
             onClick={likedMovie}
              size={28} 
              className="absolute top-2 left-2 text-gray-300"
            />}</p>
        </div>        
    </div>
    
  )
}

