"use client";
import { useState } from "react";
import Link from "next/link";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";
import "@/styles/mobilemenu.css";
import { IoClose } from "react-icons/io5";
import useKey from "@/hooks/useKey";
// Navigation links data
import { navigationLinks } from "@/utils/constants";

//method call 
const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggle = () => setIsMenuOpen(!isMenuOpen);
  const close = () => setIsMenuOpen(false);

  // This will close the menu when use pres Escape key
  useKey("Escape", close);

  return (
    <>
      <div>
        <button aria-label="Mobile Menu" onClick={toggle}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <RemoveScroll>
          <FocusLock returnFocus={true}>
            <div className="fixed inset-0 p-4">
              <div onClick={close} className="backdrop" />
              <div className="drawer bg-white ">
                <div>
                  <ul className="flex pl-1 uppercase font-kumbhSans flex-col text-bg-overly gap-4 py-4 font-medium overflow-auto text-xl">
                    {navigationLinks.map((item) => (
                      <li onClick={close} key={item.id}>
                        <Link className=" focus:text-rose" href={item.route}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="bg-bg-overly font-kumbhSans focus:outline-2 focus:outline-rose justify-center flex items-center gap-1 font-medium py-2 px-4 rounded"
                  onClick={close}
                >
                  <IoClose className="text-xl" />
                  Dismiss
                </button>
              </div>
            </div>
          </FocusLock>
        </RemoveScroll>
      )}
    </>
  );
};
export default MobileMenu;
