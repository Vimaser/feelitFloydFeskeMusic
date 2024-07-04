"use client";

import { navigationLinks } from "@/utils/constants";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";
import SocialIcon from "./icon";
import useScroll from "@/hooks/useScroll";
import { twMerge } from "tailwind-merge";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const scrollPosition = useScroll();
  const isScroll = scrollPosition.y > 50;

  return (
    <nav
      className={twMerge(
        "flex z-50 py-5 px-10 lg:px-20 fixed w-full top-0 justify-between items-center",
        isScroll
          ? "bg-bg-dark lg:bg-transparent bg backdrop-blur-[12px]"
          : "bg-transparent"
      )}
    >
      <Link className="text-xl md:text-2xl leading-snug font-bold" href="/">
        Floyd Feske Music
      </Link>
      <ul className="hidden lg:flex items-center font-medium gap-8 lg:gap-12 uppercase">
        {navigationLinks.map((link) => (
          <li className="ease-linear duration-300 transition-all hover:text-rose" key={link.id}>
            <Link href={link.route}>{link.title}</Link>
          </li>
        ))}
        <br/>
      </ul>
      <div>
        <div className="hidden lg:flex items-center gap-5">
          <Link target="_blank" href="https://www.facebook.com/floyd.feske.7/">
            <SocialIcon Icon={FaFacebookF} />
          </Link>
          <Link target="_blank" href="https://twitter.com">
            <SocialIcon Icon={FaTwitter} />
          </Link>
          <Link target="_blank" href="https://www.instagram.com">
            <SocialIcon Icon={FaInstagram} />
          </Link>
          <Link target="_blank" href="https://www.pinterest.com">
            <SocialIcon Icon={FaPinterestP} />
          </Link>
        </div>
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Header;

