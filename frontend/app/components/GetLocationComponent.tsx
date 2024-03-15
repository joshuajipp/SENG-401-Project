"use client";
import React, { useEffect, useState } from "react";
import Location, {
  GoogleAPILocation,
  LocationInfo,
} from "../interfaces/LocationI";
import { getSession } from "next-auth/react";
import { getAddress, updateAccountLocation } from "../actions";
export default function GetLocationComponent() {
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);
  useEffect(() => {
    const getUserSession = async () => {
      const session = await getSession();
      // @ts-ignore
      if (!session?.userData.location && location) {
        const res = await getAddress(location.latitude, location.longitude);
        const locations: GoogleAPILocation[] =
          res.results[0].address_components;
        const locationInfo: LocationInfo = {};
        locations.forEach((location) => {
          if (location.types.includes("locality")) {
            locationInfo.city = location.long_name;
          } else if (location.types.includes("administrative_area_level_1")) {
            locationInfo.province = location.long_name;
          } else if (location.types.includes("country")) {
            locationInfo.country = location.long_name;
          }
        });
        updateAccountLocation(locationInfo);
        return;
      }
    };
    getUserSession();
  }, [location]);

  return <div />;
}
