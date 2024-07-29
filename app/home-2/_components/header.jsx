"use client";

import { navigationLinks } from "@/utils/constants";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";
import SocialIcon from "@/components/icon";
import useScroll from "@/hooks/useScroll";
import { twMerge } from "tailwind-merge";
import MobileMenu from "@/components/mobile-menu";
//method call
const Header = () => {
  // Custom hooks for get scroll position
  const scrollPosition = useScroll();
  const isScroll = scrollPosition.y > 50;

  return (
    <nav
      className={twMerge(
        "flex z-50 py-5 px-10 lg:px-20  fixed w-full top-0 justify-between items-center",
        isScroll ? "bg-bg-dark  bg backdrop-blur-[12px]" : "bg-transparent"
      )}
    >
      <Link className="text-xl md:text-2xl leading-snug font-bold" href="/">
        Floyd Feske
      </Link>
      <ul className="hidden lg:flex items-center font-medium gap-8 lg:gap-12 uppercase">
        {navigationLinks.map((link) => (
          <li className="duration-300 ease-linear transition-all hover:text-lime" key={link.id}>
            <Link href={link.route}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <div className=" hidden lg:flex items-center gap-5">
          <Link href="https://www.facebook.com/profile.php?id=100086972757115">
            <SocialIcon className={"hover:text-lime duration-300 ease-linear transition-all"} Icon={FaFacebookF} />
          </Link>
          <Link href="https://twitter.com/">
            <SocialIcon className={"hover:text-lime duration-300 ease-linear transition-all"} Icon={FaTwitter} />
          </Link>
          <Link href="https://www.instagram.com/">
            <SocialIcon className={"hover:text-lime duration-300 ease-linear transition-all"} Icon={FaInstagram} />
          </Link>
          <Link href="https://www.pinterest.com/">
            <SocialIcon className={"hover:text-lime duration-300 ease-linear transition-all"} Icon={FaPinterestP} />
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
