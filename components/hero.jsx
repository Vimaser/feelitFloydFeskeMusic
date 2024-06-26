// Main container wrapper 1170px d31448
import Container from "./container";
import Image from "next/image";
 import "../app/home-2/styles/styles.css";
;

//method call
const Hero = () => {
  return (
    <section className="min-h-screen relative isolate bg-hero bg-cover bg-no-repeat py-10">
      <div className="bg-hero-text z-10 absolute inset-0 md:top-1/4 left-[10%] right-[10%] bg-center bg-contain bg-no-repeat"></div>

      <div className="absolute z-20 inset-0 bg-bg-overly bg-opacity-20"></div>

      <Container className="relative z-30 flex flex-col justify-center min-h-screen">
{/*         <h1
          data-aos="fade-up"
          className="text-xl sm:text-6xl md:text-8xl lg:text-9xl uppercase text-left leading-snug md:leading-tight font-bold my-10 sm:my-16 md:my-24"
        >
          <br />
          Tiger Software Developers LLC
          <br />
        </h1> */}

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
        {/*   <p className="text-base text-center lg:text-start font-bold uppercase">
            Floyd Feske <br />
            MUSIC
          </p> */}
          <div className="trigger animate-bounce">
            <a href="#featured_music" className="">
              <Image
                src={"/img/home/scroll-down arrow.png"}
                width={20}
                height={42}
                alt=""
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
