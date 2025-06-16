import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useAuth } from "../context";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import type { Movie } from "../components/MovieItem"; // Reuse your existing Movie type
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";


export const Profile = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAuth();
  const email = user?.email ?? "";

  useEffect(() => {
    if (!email) return;

    const unsubscribe = onSnapshot(doc(db, "users", email), (docSnap:any) => {
      const data = docSnap.data();
      if (data?.favShows) {
        setMovies(data.favShows);
      }
    });

    return () => unsubscribe();
  }, [email]);

  const slide = (offset: number) => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  const removeMovie = async (id: string) => {
    if (!email) {
      toast.error("Login to remove movies");
      return;
    }

    try {
      const userDocRef = doc(db, "users", email);
      const docSnap = await getDoc(userDocRef);
      const existingFavs: Movie[] = docSnap.data()?.favShows || [];

      const updatedFavs = existingFavs.filter((fav) => fav.id !== id);

      await updateDoc(userDocRef, {
        favShows: updatedFavs,
      });

      toast.success("Movie Successfully Removed");
    } catch (err) {
      console.error("Error removing movie:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        className="w-screen h-screen object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg"
        alt="Background"
      />
      <div className="fixed inset-0 bg-black/70" />
      <div className="absolute top-[20%] left-0 right-0  p-4 md:p-8 z-10">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-gray-500">{email}</p>

        <div className="mt-5">
          <h2 className="font-bold md:text-xl p-4 capitalize">Favorite Movies</h2>
          <div className="relative flex items-center group">
            {movies.length > 7 && (
              <SlArrowLeft
                onClick={() => slide(-500)}
                className="absolute left-2 opacity-80 z-10 group-hover:block hidden cursor-pointer top-22 font-bold"
                size={35}
              />
            )}

            <div
              id="slider"
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[288px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                  >
                    <img
                      className="w-full h-48 block object-cover object-top"
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/60 opacity-0 hover:opacity-100">
                      <p className="whitespace-normal text-xl md:test-sm flex justify-center items-center h-full font-bold">
                        {movie.title}
                      </p>
                      <FaHeart
                        onClick={() => removeMovie(movie.id)}
                        size={28}
                        className="absolute top-2 left-2 text-gray-300"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white p-4">No movies are added</p>
              )}
            </div>

            {movies.length > 7 && (
              <SlArrowRight
                onClick={() => slide(500)}
                className="absolute right-2 opacity-80 z-10 group-hover:block hidden cursor-pointer top-22 font-bold"
                size={35}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};
