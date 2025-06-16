import axios from "axios";
import { useEffect, useState } from "react";
import { MovieItem } from "./MovieItem";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

interface data{
    title:string;
    url:string;
}

const MovieRow = ( { title , url } : data ) => {
    const [movies,setMovies] = useState([]);
    const id = Math.floor(Math.random() * 1000);

    useEffect(() => {
        axios.get(url)
        .then((res) =>{
            setMovies(res.data.results);
        }).catch((err)=>{
            console.log("Error from Movie Row Componenet",err);
        })
    },[url]);

    const slide = (offset:number) => {
        const slider = document.getElementById("slider"+id) as HTMLElement | null;
        if(slider)
            slider.scrollLeft = slider.scrollLeft + offset; 
    }

  return (
    <>
    <h2 className="font-bold md:text-xl p-4 capitalize">{title}</h2>
    <div className="relative flex item-center group">
         <SlArrowLeft onClick={() => slide(-500)} className="absolute left-2 opacity-80 z-10  group-hover:block hidden cursor-pointer  top-22 font-bold" size={35}/>
        <div id={"slider"+id} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide" >
            {movies.map((movie:any)=>{
                return <MovieItem key={movie.id} movie={movie}/>
            })}
        </div>
        <SlArrowRight onClick={() => slide(500)} className="absolute right-2 opacity-80 z-10  group-hover:block hidden cursor-pointer  top-22 font-bold" size={35} />

    </div>

    </>
  )
}

export default MovieRow