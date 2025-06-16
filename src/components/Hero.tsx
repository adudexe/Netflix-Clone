import { useEffect, useState } from "react"
import axios from "axios";
import endpoints from "../Service";
import { useNavigate } from "react-router-dom";

interface data {
  id:string
  title:string;
  backdrop_path:string;
  release_date:string;
  overview:string;
  poster_path:string;
}

export const Hero = () => {
    const [movie,setMovie] = useState<data>();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(endpoints.popular).then((res) => {
          const movies = res.data.results
          const randomMovies = movies[ Math.floor(Math.random() * 10)]
          setMovie(randomMovies);
        }).catch((err)=>{
            console.log("Error is ",err);
        })
    },[])

    if(!movie){
      return <>
      <p>Fetching.....</p>
      </>
    }

    const truncate = (str:string,len:number) => {
      if(!str) return "";

        return str.length > len ? str.slice(0,len) + "...." : str;
    }

    const openVideo = (id:string) => {
       navigate(`/player/${id}`) 
    }

    const {id , title , backdrop_path , overview , release_date }:data = movie;

  return (
    <div className="relative w-full h-[550px] lg:h-[850px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black"></div>
        <img className="w-full h-full object-cover object-top" src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title} />

        <div className="absolute w-full top-[50%] md:top[85%] p-4 md:p-8">
          <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
          <div className="mt-8 mb-4">
            <button className="border  py-2 px-5 rounded-md" onClick={()=>openVideo(id)} >Play</button>
            {/* <button className="border border-gray-300 py-2 px-5 ml-4 rounded-md">Watch Later</button> */}
          </div>
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200">{truncate(overview,163)}</p>
        </div>



      </div>
    </div>
  )
}
