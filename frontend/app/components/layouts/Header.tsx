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
import { SuperSession } from "@/app/interfaces/UserI";

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

function UserProfile({ session }: { session: SuperSession }) {
  const imageSrc = session?.user?.image || "/missinImage.png";
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
        <span className="block text-sm">{session.user?.name}</span>
        <span className="block truncate text-sm font-medium">
          {session.userData.email}
        </span>
      </DropdownHeader>
      <Link href={`/profile/${session.userData.userID}`}>
        <DropdownItem>My Profile</DropdownItem>
      </Link>
      <Link href="/requested">
        <DropdownItem>Requested Tools</DropdownItem>
      </Link>
      <Link href="/profile/activeListings">
        <DropdownItem>Active Listings</DropdownItem>
      </Link>
      <Link href="/profile/borrowed">
        <DropdownItem>Borrowed Items</DropdownItem>
      </Link>

      <DropdownDivider />
      <Link href="/api/auth/signout">
        <DropdownItem>Sign out</DropdownItem>
      </Link>
    </Dropdown>
  );
}

export default async function Header() {
  const session: SuperSession | null = await getServerSession(authOptions);
  return (
    <Navbar fluid rounded>
      <Logo />
      <SearchBar />
      <div className="flex flex-row gap-4 place-items-center place-content-center">
        {session ? (
          <UserProfile session={session} />
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
