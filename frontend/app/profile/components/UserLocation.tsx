import { SuperSession } from "@/app/interfaces/UserI";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function UserLocation() {
  const session: SuperSession | null = await getServerSession(authOptions);
  const location = session?.userData?.location;
  return (
    <div>
      {location ? (
        <p>Your location: {location}</p>
      ) : (
        <p>Please enable location services</p>
      )}
    </div>
  );
}
