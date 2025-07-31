import { chown } from "fs";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
