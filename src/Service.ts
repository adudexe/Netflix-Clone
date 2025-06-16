const key:string = import.meta.env.VITE_API_KEY
const baseUrl:string = "https://api.themoviedb.org/3" 

// const url = 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US';

const endpoints = {
    popular : `${baseUrl}/movie/popular?api_key=${key}&`,
    topRated : `${baseUrl}/movie/top_rated?api_key=${key}`,
    trending:`${baseUrl}/movie/popular?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
    upcoming:`${baseUrl}/movie/upcoming?api_key=${key}`,
    video : (id:number) => {
        return `${baseUrl}/movie/${id}/videos?api_key=${key}&language=en-US`;
    }
}

export default endpoints
