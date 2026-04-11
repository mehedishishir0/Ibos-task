import Image from "next/image";
import Link from "next/link";

export function AuthNavbar() {
  return (
    <header className="shadow-[0px_2.71px_4.4px_0px_#C0C0C007,0px_6.86px_11.12px_0px_#C0C0C00A,0px_14px_22.68px_0px_#C0C0C00C,0px_28.84px_46.72px_0px_#C0C0C00F,0px_79px_128px_0px_#C0C0C017] h-16 w-full  bg-white px-6 ">
      <div className="container mx-auto flex items-center h-full justify-between">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
        <div>
          <Image src="/images/Logo.png" width={100} height={100} alt="logo" />
        </div>
        </Link>
      </div>
      <h1 className="text-lg font-semibold text-slate-700">Akij Resource</h1>
      <div>
        
      </div>
      </div>
    </header>
  );
}
