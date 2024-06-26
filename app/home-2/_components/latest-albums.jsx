"use client";
// mock latestAlbums data
import { latestAlbums } from "@/data/data";
import SectionHeading from "@/components/section-heading";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import "../styles/latest-albums.css";
import Link from "next/link";

//method call
const LatestAlbums = () => {
  // This hook part of embla-carousel-react
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div id="albums" className="bg-white text-bg-dark">
      <div className="py-section">
        <SectionHeading className="mb-12 lg:mb-16">
          <h2 className="uppercase text-center">OUR LATEST ALBUMS</h2>
        </SectionHeading>
        <div className="embla_albums px-container" ref={emblaRef}>
          <div className="flex gap-4 embla__container_albums">
            {latestAlbums.map((album) => (
              <div key={album.id} className="embla__slide_albums">
                <Albums album={album} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Albums = ({ album }) => (
  <article className="isolate relative group h-[470px] w-[376px] ">
    <div>
      <Image width={358} height={440} src={album.image} alt="" />
    </div>
    <div className="z-10 transition-all absolute inset-0 flex flex-col items-center p-2 duration-300 ease-linear group-hover:pb-14 text-white justify-end font-semibold">
      <Link
        className="bg-lime px-8 py-4 opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100 text-bg-dark"
        href={"/"}
      >
        LISTEN MUSIC
      </Link>
    </div>
  </article>
);

export default LatestAlbums;
