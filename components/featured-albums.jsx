"use client";

import Image from "next/image";
import Container from "./container";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import SocialIcon from "./icon";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/featuredalbums.css";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FeaturedAlbums = () => {
  const [musicArray, setMusicArray] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [sectionTitle, setSectionTitle] = useState('Featured Album');
  const [sectionSubtitle, setSectionSubtitle] = useState('Featured Songs');
  const [featuredImageURL, setFeaturedImageURL] = useState('/img/home/albums.jpg');

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const musicCollection = collection(db, "music");
        const musicSnapshot = await getDocs(musicCollection);
        const musicList = musicSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMusicArray(musicList);
        setCurrentMusic(musicList[0]);

        const configDoc = await getDoc(doc(db, 'config', 'featuredAlbum'));
        if (configDoc.exists()) {
          const configData = configDoc.data();
          setSectionTitle(configData.sectionTitle || 'Featured Album');
          setSectionSubtitle(configData.sectionSubtitle || 'Featured Songs');
          setFeaturedImageURL(configData.featuredImageURL || '/img/home/albums.jpg');
        }
      } catch (error) {
        console.error("Error fetching music: ", error);
      }
    };

    fetchMusic();
  }, []);

  return (
    <section className="relative py-section isolate bg-albums bg-cover bg-no-repeat">
      <Container className="relative z-20">
        <div className="grid items-center grid-cols-1 md:grid-cols-3 gap-16">
          <div data-aos="fade-up" className="col-span-2">
            <header className="mb-10">
              <span className="font-semibold text-base inline-block text-rose mb-1">
                {sectionTitle}
              </span>
              <h3 className="text-4xl font-bold">{sectionSubtitle}</h3>
            </header>
            <div className="flex flex-col gap-2">
              {musicArray.map((music) => (
                <div
                  onClick={() => setCurrentMusic(music)}
                  key={music.id}
                  className={twMerge(
                    "relative py-5 group transition-all items-center hover:bg-bg-overly cursor-pointer px-4 sm:px-10 bg-bg-dark flex justify-between",
                    currentMusic && currentMusic.id === music.id ? "bg-bg-overly text-rose" : ""
                  )}
                >
                  <div className="flex transition-all duration-300 ease-linear group-hover:text-rose text-xl gap-5 items-center">
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
                          currentMusic && currentMusic.id === music.id ? "flex" : ""
                        )}
                      >
                        <Link href={music.socialLinks?.facebook || "#"}>
                          <SocialIcon Icon={FaFacebookF} />
                        </Link>
                        <Link href={music.socialLinks?.twitter || "#"}>
                          <SocialIcon Icon={FaTwitter} />
                        </Link>
                        <Link href={music.socialLinks?.instagram || "#"}>
                          <SocialIcon Icon={FaInstagram} />
                        </Link>
                        <Link href={music.socialLinks?.pinterest || "#"}>
                          <SocialIcon Icon={FaPinterestP} />
                        </Link>
                      </div>
                    </div>
                    <span className="text-md font-bold text-rose">
                      {music.duration}
                    </span>
                  </div>
                  {music.imageURL && (
                    <img
                      src={music.imageURL}
                      onError={(e) => { e.target.src = '/img/home/default.jpg'; }}
                      className={twMerge(
                        "absolute scale-0 group-hover:scale-100 left-1/3 duration-500 transition-all top-5 md:top-[-40px] rotate-0 w-[13rem] h-[17rem] object-cover",
                        currentMusic && currentMusic.id === music.id ? "md:left-2/3 group-hover:rotate-45" : ""
                      )}
                      width={220}
                      height={195}
                      alt={music.title}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5">
              {currentMusic && currentMusic.musicURL ? (
                <AudioPlayer
                  autoPlay={false}
                  src={currentMusic.musicURL}
                  onPlay={(e) => console.log("Playing: ", currentMusic.title)}
                />
              ) : (
                <p>No music selected</p>
              )}
            </div>
          </div>
          <div data-aos="fade-up" className="hidden md:block">
            <img
              src={featuredImageURL}
              onError={(e) => { e.target.src = '/img/home/default.jpg'; }}
              width={400}
              height={592}
              alt="albums"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedAlbums;
