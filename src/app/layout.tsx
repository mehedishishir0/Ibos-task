import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/shared/Footer";
import TopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import QueryProvider from "@/provider/query-provider";

export const metadata: Metadata = {
  title: "Ibos Frontend Task",
  description: "Ibos Frontend Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9FAFB] min-h-screen flex flex-col">
        <Toaster />
        <TopLoader
          color="#6633FF"
          shadow="0 0 10px #6633FF, 0 0 5px #147575"
          showSpinner={false}
          height={4}
          easing="ease-in"
        />
        <QueryProvider>
          <main className="flex-1 flex flex-col">{children}</main>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
