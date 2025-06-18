import { useParams } from "react-router-dom";
import endpoints from "../Service";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface VideoData {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
}

interface MovieDetails {
  title: string;
  overview: string;
}

export const VideoPlayer = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const { id } = useParams();
  const videoUrl = endpoints.video(Number(id));
  const movieDetailsUrl = endpoints.details(Number(id));

  useEffect(() => {
    axios
      .get(videoUrl)
      .then((res: any) => {
        setVideoData(res.data.results[0]);
      })
      .catch((err: any) => {
        toast.error("Error fetching video");
        console.error("Video Error:", err);
      });

    axios
      .get(movieDetailsUrl)
      .then((res: any) => {
        setMovieDetails({
          title: res.data.title,
          overview: res.data.overview,
        });
      })
      .catch((err: any) => {
        toast.error("Error fetching movie details");
        console.error("Movie Details Error:", err);
      });
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/30 px-4 lg:px-8">
      <div className="w-full max-w-7xl p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Trailer */}
          <div className="w-full lg:w-2/3 aspect-video">
            {videoData ? (
              <iframe
                className="w-full h-full rounded-lg shadow-md"
                src={`https://www.youtube.com/embed/${videoData.key}`}
                allowFullScreen
                title={videoData.name}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-300">
                Loading trailer...
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6 justify-center">
            <h1 className="text-4xl font-extrabold text-gray-300">
              {movieDetails?.title || "Loading..."}
            </h1>

            <p className="text-lg text-gray-300">
              <strong>📅 Published:</strong>{" "}
              {videoData?.published_at
                ? new Date(videoData.published_at).toLocaleDateString()
                : "N/A"}
            </p>

            <p className="text-lg text-gray-300">
              <strong>✅ Official:</strong> {videoData?.official ? "Yes" : "No"}
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-2">📝 Overview</h2>
              <p className="text-base leading-relaxed text-gray-300">
                {movieDetails?.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
