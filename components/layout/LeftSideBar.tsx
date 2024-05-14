"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-[300px] left-0 top-0 sticky p-10 flex flex-col gap-16 bg-fuchsia-50 shadow-xl max-lg:hidden">
      <Image src="/uniqlo-logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-primaryRed" : "text-primaryBlack"
            }`}
          >
            {link.icon} <p className="font-uniqlo capitalize">{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p className="text-primaryBlack font-uniqlo">Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;