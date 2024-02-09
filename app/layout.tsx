import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `System ${process.env.NEXT_PUBLIC_POLICE_NAME}`,
  description: `System da policia ${process.env.NEXT_PUBLIC_POLICE_NAME}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${inter.className} min-w-screen max-w-screen min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
