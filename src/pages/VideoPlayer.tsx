import { useParams } from "react-router-dom"
import endpoints from "../Service"
import { useEffect, useState } from "react";
import axios from "axios";

interface Data {
  id: string
  iso_639_1 : string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at : Date
}



export const VideoPlayer = () => {
  const [data,setData] = useState<Data | null>(null);

  const {id} = useParams();
  const url = endpoints.video(Number(id)); 
  useEffect(()=>{
    axios.get(url).then((res) => {
      setData(res.data.results[0]);
    })
  },[id])
  
  return (
    <>
        <div className="fixed top-10 left-0 h-230 w-screen p-5">
            <iframe src={`https://www.youtube.com/embed/${data?.key}`}
              allowFullScreen
             className="h-full w-full" >
            <p>Title</p>
            <p>Description</p>
            </iframe>
        </div>
    </>
  )
}
