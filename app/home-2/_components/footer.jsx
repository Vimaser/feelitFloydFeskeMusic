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
//method call 
const Footer = () => {
  return (
    <div className="relative bg-footer-dark bg-cover bg-no-repeat">
      <div className="absolute z-10 inset-0 bg-footer-2 bg-cover bg-no-repeat"></div>
      <Container className="pt-section text-white relative z-20">
        <header>
          <h3 className="text-2xl text-center sm:text-start mx-auto sm:mx-0 font-bold mb-12 max-w-[250px]">
            Follow Me On Instagram
          </h3>
        </header>
        <div className="flex gap-16 md:gap-20 lg:gap-28 mb-20 flex-wrap">
          <div className="basis-[250px] mx-auto sm:mx-0 ">
            <div className="grid gap-4 grid-cols-3 ">
              <Image
                src={"/img/home/g1.jpg"}
                width={70}
                height={70}
                className="object-cover h-[70px]"
                alt="music"
              />
              <Image
                src={"/img/home/g2.jpg"}
                width={70}
                height={70}
                className="object-cover h-[70px]"
                alt="music"
              />
              <Image
                src={"/img/home/g4.jpg"}
                width={70}
                height={70}
                className="object-cover h-[70px]"
                alt="music"
              />
              <Image
                src={"/img/home/g5.jpg"}
                width={70}
                height={70}
                className="object-cover h-[70px]"
                alt="music"
              />
              <Image
                src={"/img/home/g6.jpg"}
                width={70}
                height={70}
                className="object-cover h-[70px]"
                alt="music"
              />
              <Image
                src={"/img/home/g8.jpg"}
                width={70}
                height={70}
                className="object-cover h-[70px]"
                alt="music"
              />
            </div>
          </div>
          <div className="sm:flex-1 mx-auto sm:mx-0 lg:justify-around gap-10 flex">
            <div className="flex flex-col gap-2">
              <div>Bouvet Island Jeanetteside</div>
              <div>53 Brannon Falls Suite</div>
              <div>NY, USA</div>

              <div className="flex pt-4 gap-10">
                <Link href="https://www.facebook.com/">
                  <SocialIcon
                    className={"hover:text-lime"}
                    Icon={FaFacebookF}
                  />
                </Link>
                <Link href="https://twitter.com/">
                  <SocialIcon className={"hover:text-lime"} Icon={FaTwitter} />
                </Link>
                <Link href="https://www.instagram.com/">
                  <SocialIcon
                    className={"hover:text-lime"}
                    Icon={FaInstagram}
                  />
                </Link>
                <Link href="https://www.pinterest.com/">
                  <SocialIcon
                    className={"hover:text-lime"}
                    Icon={FaPinterestP}
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <FooterLink href="/"> Home </FooterLink>
              <FooterLink href="/"> About </FooterLink>
              <FooterLink href="/"> Tour </FooterLink>
              <FooterLink href="/"> Gallery </FooterLink>
              <FooterLink href="/"> Shop </FooterLink>
            </div>
          </div>
          <div className="basis-[250px] mx-auto sm:mx-0 text-center sm:text-start flex flex-col gap-2 font-medium">
            <FooterLink href="/"> Others Demos </FooterLink>
            <FooterLink href="/"> View Themes </FooterLink>
            <FooterLink href="/"> Purchase Theme </FooterLink>
          </div>
        </div>
        <div className="py-5 border-t flex-col md:flex-row font-bold text-center md:text-start gap-2 border-cyan flex justify-center md:justify-between">
          <div>Call Us Today! 1 (225) 678-1294 || 1 (580) 262 0127</div>
          <div>© 2024 Floyd Feske Music is Powered by Tiger Software Developers LLC</div>
        </div>
      </Container>
    </div>
  );
};

// Footer Item Link Component
const FooterLink = ({ children, href = "/", ...props }) => {
  return (
    <Link
      {...props}
      className="text-white hover:text-lime transition-all ease-linear duration-300"
      href={href}
    >
      {children}
    </Link>
  );
};

export default Footer;
