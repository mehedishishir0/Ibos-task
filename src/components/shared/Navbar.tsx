"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useLogout } from "@/hooks/Apicalling";

export function Navbar({title}:{title:string}) {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const user = session?.data?.user as { fullName: string };

  const logoutMutation = useLogout(token);

  const handelLogOut = () => {
    logoutMutation.mutate();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="shadow-[0px_2.71px_4.4px_0px_#C0C0C007,0px_6.86px_11.12px_0px_#C0C0C00A,0px_14px_22.68px_0px_#C0C0C00C,0px_28.84px_46.72px_0px_#C0C0C00F,0px_79px_128px_0px_#C0C0C017] py-6 w-full  bg-white ">
      <div className="container mx-auto flex items-center h-full justify-between">
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <div className="flex gap-20 items-center ">
              <div>
                <Image
                  className="w-28 h-8"
                  src="/images/Logo.png"
                  width={900}
                  height={900}
                  alt="logo"
                />
              </div>
              <p className="text-[#130B2C] font-sans text-[16px]">
              {title}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity outline-none">
                <Avatar className="h-10 w-10 border border-gray-100 shadow-sm">
                  <AvatarImage src="" alt="Arif Hossain" />
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[#334155] font-bold text-sm">
                    {user?.fullName}
                  </span>
                </div>

                <ChevronDown size={18} className="text-[#64748B] ml-1" />
              </div>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent
              className="w-56 mt-2 rounded-xl shadow-lg ring-0 bg-white border-[#E5E7EB]"
              align="end"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">My Account</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer !hover:border-none py-2.5 rounded-lg">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handelLogOut}
                className="text-red-600 cursor-pointer py-2.5 rounded-lg focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
