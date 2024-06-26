import Container from "@/components/container";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

//method call
const FeaturedSongs = () => {
  return (
    <div>
      <Container className="flex gap-10 lg:gap-0 flex-col-reverse lg:flex-row text-bg-dark py-section">
        <div
          data-aos="fade-up"
          className="flex-1 flex-col-reverse lg:flex-row flex items-center justify-center lg:justify-start "
        >
          <Image
            src={"/img/home/featured-music.png"}
            className="z-10 relative w-full max-w-md lg:w-[440px]"
            width={475}
            height={475}
            alt=""
          />

          <Image
            src={"/img/home/cd.png"}
            className="relative w-[393px] rotate-90 -mb-[50%] sm:-mb-[29%] lg:mb-0 lg:rotate-0 lg:-ml-[30%]"
            width={393}
            height={393}
            alt=""
          />
        </div>
        <div
          data-aos="fade-up"
          className="basis-[470px] relative z-30 -mt-[228px] font-kumbhSans shadow-md"
        >
          <div className="px-12 py-7 flex-col sm:flex-row bg-lime flex items-center gap-7">
            <Image
              src={"/img/home/lady.png"}
              className="object-cover"
              width={155}
              height={142}
              alt=""
            />
            <div className="text-center sm:text-start">
              <h5 className="text-md font-bold mb-1">Trei Feske</h5>
              <p className="text-sm font-semibold">Music Artitst</p>
            </div>
          </div>
          <div className="px-9 py-14 flex flex-col gap-7">
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
          </div>
        </div>
      </Container>
    </div>
  );
};
//method call
const Song = () => (
  <article className="flex justify-between items-center">
    <div>
      <h5 className="text-md font-bold ">1.Weebs Paradise</h5>
      <p className="text-sm text-cyan font-normal">Trei Feske</p>
    </div>
    <div className="text-cyan flex items-center gap-6">
      <span className="text-sm">0:12</span>
      <button className="text-md">
        <FiDownload />
      </button>
      <button className="text-md">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em"><g><path d="M6.562,21.94a2.5,2.5,0,0,1-2.5-2.5V4.56A2.5,2.5,0,0,1,7.978,2.5L18.855,9.939a2.5,2.5,0,0,1,0,4.12L7.977,21.5A2.5,2.5,0,0,1,6.562,21.94Zm0-18.884a1.494,1.494,0,0,0-.7.177,1.477,1.477,0,0,0-.8,1.327V19.439a1.5,1.5,0,0,0,2.35,1.235l10.877-7.44a1.5,1.5,0,0,0,0-2.471L7.413,3.326A1.491,1.491,0,0,0,6.564,3.056Z"></path></g></svg>
      </button>
    </div>
  </article>
);

export default FeaturedSongs;
