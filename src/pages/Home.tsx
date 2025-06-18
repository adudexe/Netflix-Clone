import { Hero } from '../components/Hero';
import MovieRow from '../components/MovieRow';
import endpoints from '../Service';
export const Home = () => {
  return (
    <>
    <Hero/>
    <MovieRow title={"Upcoming"} url={endpoints.upcoming} />
    <MovieRow title={"Trending"} url={endpoints.trending}/>
    <MovieRow title={"Top Rated"} url={endpoints.topRated}/>
    <MovieRow title={"Popular"} url={endpoints.popular}/>
    </>
  )
}
