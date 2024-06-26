import { DM_Sans, Space_Grotesk, Kumbh_Sans, Pacifico } from "next/font/google";
//export google fonts 
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const dMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dMSans",
});
export const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kumbhSans",
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});
