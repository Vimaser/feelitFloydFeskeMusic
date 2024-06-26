"use client";

import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { twMerge } from "tailwind-merge";
import { useLayout } from "@/app/LayoutProvider";

const Settings = () => {
  const [active, setActive] = useState(false);
  const toggle = () => setActive((prev) => !prev);
  const { setIsRTL } = useLayout();
  return (
    <div dir="ltr" className="z-40  fixed top-1/2 right-0 ">
      <button
        onClick={toggle}
        className="py-[10px] relative z-40 shadow-md rounded-s bg-lime cursor-pointer  pl-[14px] pr-4 text-white hover:text-black hover:bg-white duration-500  h-10"
      >
        <IoSettingsSharp />
      </button>

      <div
        className={twMerge(
          "absolute w-fit   bg-rose  top-1/2 -translate-y-1/2  shadow-md right-14  p-4 rounded transition-all duration-300",
          active
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-[140%] opacity-0 scale-75"
        )}
      >
        <div>
          <h6 className="font-bold uppercase border-b-2 border-black pb-1 text-black text-sm text-nowrap">
            Layout
          </h6>
          <div className="flex items-center pt-2 text-4xl gap-2">
            <CiTextAlignLeft
              title="left to right"
              onClick={() => setIsRTL(false)}
              className="bg-white cursor-pointer  size-8 rounded"
            />
            <CiTextAlignRight
              title="right to left"
              onClick={() => setIsRTL(true)}
              className="bg-white cursor-pointer  size-8 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
