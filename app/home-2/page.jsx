import FeaturedGrid from "@/components/featured-grid";
import Featured from "./_components/featured";
import FeaturedAlbums from "./_components/featured-albums";
import Header from "./_components/header";
import Hero from "./_components/hero";
import UpcomingShows from "./_components/upcoming-shows";
import LatestBlogs from "./_components/latest-blogs";
import Footer from "./_components/footer";
import LatestAlbums from "./_components/latest-albums";
import FeaturedSongs from "./_components/featured-songs";

//method call of home-2 page
const Home2 = () => {
  return (
    <div className="text-base h-[200vh] text-white">
      <Header />
      <Hero />
      <FeaturedSongs />
      <LatestAlbums />
      <FeaturedAlbums />
      <Featured />
      <FeaturedGrid />
      <UpcomingShows />
      <LatestBlogs />
      <Footer />
    </div>
  );
};
export default Home2;
