import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="fixed bottom-0  w-full bg-[#130B2C] py-6 text-white">
      <div className="container mx-auto flex flex-col md:items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex md:items-center md:flex-row flex-col gap-2">
          <span className="text-lg text-[#FFFFFF] ">Powered by</span>
          <div className="font-bold text-white md:pl-2 leading-none">
            <Image
              src="/images/Footer-logo.png"
              width={100}
              height={100}
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex flex-col md:items-center items-start  md:gap-6 gap-4 text-sm text-[#FFFFFF] md:flex-row">
          <span className="font-medium">Helpline</span>
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+88 011020202505</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
