import "./globals.css";
import { twMerge } from "tailwind-merge";
import "aos/dist/aos.css"; // Import AOS CSS file
// Fonts from google fonts
import { dMSans, kumbhSans, spaceGrotesk, pacifico } from "@/fonts/fonts";
import AnimationProvider from "./AnimationProvider";
import Settings from "@/components/Settings";
import LayoutProvider from "./LayoutProvider";

// Homepage Metadata
export const metadata = {
  title: "Floyd Feske Music - Personal Musical Expose Nextjs Template",
  description:
    "Floyd Feske is a talented singer songwriter and musician.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          spaceGrotesk.className,
          dMSans.variable,
          kumbhSans.variable,
          pacifico.variable
        )}
      >
        <AnimationProvider>
          <LayoutProvider>
            <div className="layout">
              <Settings />
              {children}
            </div>
          </LayoutProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
