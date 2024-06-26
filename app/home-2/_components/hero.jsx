// components/Hero.js
import React from "react";
import Container from "@/components/container";
import "../../home-2/styles/styles.css";

const Hero = () => {
  return (
    <section className="min-h-screen relative isolate py-10 overflow-hidden">
      <div className="hero-slide bg-hero"></div>
      <div className="hero-slide bg-hero2"></div>
      <div className="hero-slide bg-hero3"></div>
      <div className="absolute z-10 inset-0 bg-bg-overly bg-opacity-10"></div>
      <Container className="relative z-20 flex flex-col justify-center min-h-screen sm:pt-32 md:pt-60 sm:pb-24 md:pb-56">
        <h1
          data-aos="fade-up"
          className="text-7xl sm:text-9xl md:text-[160px] lg:text-[180px] uppercase mb-9 text-center md:text-start leading-snug md:leading-[160px] font-bold mt-20"
        >
          STREAM <br />
          MY MUSIC
        </h1>
        <div
          data-aos="zoom-in"
          className="flex justify-center md:justify-start text-md font-bold gap-5 items-center"
        >
          <span>Floyd Feske</span>
          <h5 className="text-[24px] uppercase leading-7">24.JUNE.2024</h5>
          <span>Music</span>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
