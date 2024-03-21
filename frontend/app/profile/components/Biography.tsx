import { Textarea } from "flowbite-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import BiographyModal from "../BiographyModal";

export default async function Biography() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-medium">Biography</h1>
        {/* @ts-ignore */}
        <BiographyModal bio={session?.userData?.biography} />
      </div>
      <div className="flex flex-col gap-4 text-black dark:text-white">
        <div className="max-w-md">
          <Textarea
            id="comment"
            placeholder="Enter a description..."
            rows={12}
            className=" bg-purple-200 text-brand shadow "
            // @ts-ignore
            defaultValue={session?.userData?.biography || ""}
          />
        </div>
      </div>
    </div>
  );
}
