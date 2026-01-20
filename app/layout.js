import { Poppins, Macondo } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

const macondo = Macondo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-macondo",
});

export const metadata = {
  title: "Inucode Dev | Creative Web Developer",
  description: "Passionate web developer dedicated to creating engaging and functional digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${macondo.variable} font-sans bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
