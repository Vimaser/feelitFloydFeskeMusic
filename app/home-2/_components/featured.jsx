"use client";

import { CiPlay1 } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/container";

const LazyReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const Featured = () => {
  const videoUrl = "https://youtu.be/8afl_cTiqGs?si=nAaNTARwi9ymoF4Z";
  const [play, setPlay] = useState(false);

  return (
    <section className="bg-white text-bg-dark">
      <Container>
        <div className="py-section flex flex-col lg:flex-row gap-20 lg:items-center px-container">
          <div data-aos="fade-up" className="flex-1 text-center lg:text-start">
            <h2>
            I'VE COME TO THE <br className="hidden lg:block" />
            SHORES OF MY LIFE
            </h2>
            <p className="text-cyan mx-auto lg:mx-0 mt-10 mb-12 max-w-[533px]">
            Bible & The Bottle was written for a friend struggling with addiction and sobriety while 
            questioning his mortality. "His days were numbered like the tide. 
            "He didn't feel worthy of the sacrifice and agony that Christ endured for him. 
            I wanted to paint a picture of the struggles of a real God-fearing man, 
            not just someone who always presents their Sunday best.
            </p>
            <Link
              className="font-medium text-bg-dark hover:text-lime duration-300 transition-all ease-linear"
              href="/"
            >
              MORE ABOUT ME
            </Link>
          </div>
          <div data-aos="fade-up" className="flex-1 relative isolate">
            {!play && (
              <div
                className="absolute inset-0 flex flex-col justify-center items-center pt-10 cursor-pointer"
                onClick={() => setPlay(true)}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 text-xl grid place-content-center to-purple-600 mb-[-30px]">
                  <CiPlay1 />
                </div>
                <Image
                  src={"/img/home/WATCH.png"}
                  width={242}
                  height={95}
                  alt=""
                />
              </div>
            )}
            {play && (
              <div className="flex justify-center">
                <LazyReactPlayer
                  url={videoUrl}
                  style={{ maxWidth: "640px" }}
                  width="100%"
                  height="540px"
                  controls
                  playing={play}
                  onPause={() => setPlay(false)}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Featured;