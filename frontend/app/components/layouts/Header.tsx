import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import SearchBar from "../SearchBar";

function Logo() {
  return (
    <Link href="/" className="flex flex-row">
      <Image
        height={36}
        width={36}
        src="/favicon.png"
        className="mr-3 rounded"
        alt="ToolShed Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        ToolShed
      </span>
    </Link>
  );
}

function UserProfile({
  sessionUser,
}: {
  sessionUser:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | null
    | undefined;
}) {
  const imageSrc = sessionUser?.image || "";
  return (
    <Dropdown
      inline
      label={
        <Image
          src={imageSrc}
          width={45}
          height={45}
          alt="profile image"
          className="rounded-full"
        />
      }
    >
      <DropdownHeader>
        <span className="block text-sm">{sessionUser?.name}</span>
        <span className="block truncate text-sm font-medium">
          {sessionUser?.email}
        </span>
      </DropdownHeader>
      <Link href="profile">
        <DropdownItem>My Profile</DropdownItem>
      </Link>
      <Link href="requested">
        <DropdownItem>Requested Tools</DropdownItem>
      </Link>
      <Link href="listings">
        <DropdownItem>Active Listings</DropdownItem>
      </Link>
      {/* <DropdownItem>Disputes</DropdownItem> */}
      <DropdownDivider />
      <Link href="/api/auth/signout">
        <DropdownItem>Sign out</DropdownItem>
      </Link>
    </Dropdown>
  );
}

export default async function Header() {
  const session = await getServerSession(authOptions);
  const sessionUser = session && session.user;
  return (
    <Navbar fluid rounded>
      <Logo />
      <SearchBar />
      <div className="flex flex-row gap-4 place-items-center place-content-center">
        {session ? (
          <UserProfile sessionUser={sessionUser} />
        ) : (
          <Link href="/api/auth/signin">
            <Button
              className="transition duration-300 ease-in-out transform hover:scale-105"
              gradientDuoTone="purpleToBlue"
            >
              {"Sign in"}
            </Button>
          </Link>
        )}
        <Link href="/upload">
          <Button
            color="primary"
            className="transition duration-300 ease-in-out transform hover:scale-105"
          >
            List Items
          </Button>
        </Link>
      </div>
    </Navbar>
  );
}
