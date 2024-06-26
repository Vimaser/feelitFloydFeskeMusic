"use client";
import Image from "next/image";
import Container from "@/components/container";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";
import SocialIcon from "@/components/icon";

// mock music data
import { musicArray } from "@/data/data";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import AudioPlayer from "react-h5-audio-player";
// css for audio player
import "react-h5-audio-player/lib/styles.css";
import "../styles/featuredalbums2.css";
//method call
const FeaturedAlbums = () => {
  // get current music for here
  const [currentMusic, setCurrentMusic] = useState(musicArray[0]);

  return (
    <section className="relative py-section isolate bg-albums-2 bg-cover bg-no-repeat ">
      <Container className="relative z-20">
        <div className="grid items-center grid-cols-1 md:grid-cols-3 gap-16">
          <div data-aos="fade-up" className="col-span-2">
            <header className="mb-10">
              <span className="font-semibold text-base inline-block text-lime mb-1">
                Featured Album
              </span>
              <h3 className="text-4xl font-bold">Featured Albums</h3>
            </header>
            <div className="flex flex-col gap-2">
              {musicArray.map((music) => (
                <div
                  onClick={() => setCurrentMusic(music)}
                  key={music.id}
                  className={twMerge(
                    "py-5 group transition-all duration-300 ease-linear items-center hover:bg-bg-overly cursor-pointer px-4 sm:px-10 bg-bg-dark flex justify-between",
                    currentMusic.id === music.id ? "bg-bg-overly text-lime" : ""
                  )}
                >
                  <div className="flex transition-all group-hover:text-lime text-xl gap-5 items-center">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em"><g><path d="M6.562,21.94a2.5,2.5,0,0,1-2.5-2.5V4.56A2.5,2.5,0,0,1,7.978,2.5L18.855,9.939a2.5,2.5,0,0,1,0,4.12L7.977,21.5A2.5,2.5,0,0,1,6.562,21.94Zm0-18.884a1.494,1.494,0,0,0-.7.177,1.477,1.477,0,0,0-.8,1.327V19.439a1.5,1.5,0,0,0,2.35,1.235l10.877-7.44a1.5,1.5,0,0,0,0-2.471L7.413,3.326A1.491,1.491,0,0,0,6.564,3.056Z"></path></g></svg>
                    <h5 className="text-md font-bold line-clamp-1">
                      {music.title}
                    </h5>
                  </div>
                  <div className="flex gap-10">
                    <div className="hidden md:block">
                      <div
                        className={twMerge(
                          "hidden group-hover:flex items-center gap-5",
                          currentMusic.id === music.id ? "flex" : ""
                        )}
                      >
                        <Link href={music.socialLinks.facebook}>
                          <SocialIcon Icon={FaFacebookF} />
                        </Link>
                        <Link href={music.socialLinks.twitter}>
                          <SocialIcon Icon={FaTwitter} />
                        </Link>
                        <Link href={music.socialLinks.instagram}>
                          <SocialIcon Icon={FaInstagram} />
                        </Link>
                        <Link href={music.socialLinks.pinterest}>
                          <SocialIcon Icon={FaPinterestP} />
                        </Link>
                      </div>
                    </div>
                    <span className="text-md font-bold text-lime">
                      {music.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <AudioPlayer
                autoPlay={false}
                src={currentMusic.src}
                onPlay={(e) => console.log("onPlay")}
              />
            </div>
          </div>
          <div data-aos="fade-up" className="hidden md:block">
            <Image
              src={"/img/home/albums.jpg"}
              width={400}
              height={592}
              alt="alubum2"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
export default FeaturedAlbums;
