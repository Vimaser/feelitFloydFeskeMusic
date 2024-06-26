import Link from "next/link";
// Main container wrapper 1170px
import Container from "./container";
import SectionHeading from "./section-heading";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

//method call 
const NewestAlbums = () => {
  return (
    <section
      id="albums"
      className="relative bg-top bg-podcast lg:bg-cover bg-no-repeat"
    >
      <Container className="py-section relative z-20">
        <SectionHeading className="flex flex-col lg:flex-row gap-8 justify-between items-center text-center lg:text-start">
          <h2 className="max-w-3xl">
            CHECK MY NEWEST SINGLES
          </h2>
          <Link className="font-medium hover:text-white transition-all duration-300 ease-linear underline text-rose" href="/">
            VIEW ALL RELEASES
          </Link>
        </SectionHeading>
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-16 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-8 md:gap-10 lg:gap-16 flex-wrap items-end">
            <AlbumWrapper
              data-aos="zoom-in-up"
              className="lg:basis-[384px] h-96 lg:h-[384px]"
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1">Samantha</p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                Samantha
                </h6>
              </AlbumOverly>

              <Image
                src={"/img/home/g1.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>
            <AlbumWrapper
              data-aos="zoom-in"
              className=" lg:basis-[290px] h-96  lg:h-[290px] "
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1">QUEEN OF THE </p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  DAMNED
                </h6>
              </AlbumOverly>

              <Image
                src={"/img/home/g2.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>
            <AlbumWrapper
              data-aos="zoom-in-down"
              className="lg:basis-[150px] group: h-96 lg:h-[150px] lg:mb-48 "
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1">NOT THE</p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  MAN
                </h6>
              </AlbumOverly>
              <Image
                src={"/img/home/g3.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>
{/*             <AlbumWrapper
              data-aos="zoom-in-up"
              className="lg:hidden lg:basis-[150px] group: h-96 lg:h-[150px] lg:mb-48 "
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1">Memory</p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  Waltz
                </h6>
              </AlbumOverly>
              <Image
                src={"/img/home/g4.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-8 md:gap-10 lg:gap-16 flex-wrap items-start">
            <AlbumWrapper className=" lg:basis-[250px] h-96 lg:h-[250px] relative">
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1">Memory</p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  Waltz
                </h6>
              </AlbumOverly>
              <Image
                src={"/img/home/g4.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>
            <AlbumWrapper
              data-aos="zoom-in-up"
              className=" lg:basis-[150px] group: h-96 overflow-hidden lg:h-[150px] "
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1"></p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  Mary
                </h6>
              </AlbumOverly>
              <Image
                src={"/img/home/g5.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>
            <AlbumWrapper
              data-aos="zoom-in-up"
              className="lg:basis-[255px] h-96 rounded overflow-hidden lg:h-[255px] "
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1">Journey</p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  Home
                </h6>
              </AlbumOverly>
              <Image
                src={"/img/home/g6.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>

            <AlbumWrapper
              data-aos="zoom-in-down"
              className=" lg:basis-[290px] lg:-mt-48 h-96 lg:h-[290px]"
            >
              <AlbumOverly>
                <p className="text-sm capitalize line-clamp-1"></p>
                <h6 className="text-lg uppercase font-bold line-clamp-1">
                  Kingdom
                </h6>
              </AlbumOverly>
              <Image
                src={"/img/home/g7.png"}
                fill
                alt=""
                className="w-full object-cover"
              />
            </AlbumWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
};
//method call
const AlbumOverly = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "bg-light-rose z-10 transition-all ease-linear duration-300 opacity-0 group-hover:opacity-80 absolute inset-0 flex flex-col text-center items-center justify-center p-1",
        className
      )}
    >
      {children}
    </div>
  );
};
//method call
const AlbumWrapper = ({ children, className, ...props }) => {
  return (
    <article
      data-aos="zoom-in-right"
      {...props}
      className={twMerge(
        "isolate group basis-full relative rounded overflow-hidden shadow-high hover:shadow-2xl transition-all ease-linear duration-300 hover:shadow-light-rose ",
        className
      )}
    >
      {children}
    </article>
  );
};

export default NewestAlbums;
