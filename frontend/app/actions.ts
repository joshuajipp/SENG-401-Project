"use server";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./utils/authOptions";
import { LocationInfo } from "./interfaces/LocationI";

const CREATE_USER_URL = process.env.CREATE_USER_URL as string;
const GET_USER_URL = process.env.GET_USER_URL as string;
const CREATE_LISTING_URL = process.env.CREATE_LISTING_URL as string;
const GET_BORROWED_ITEMS_URL = process.env.GET_BORROWED_ITEMS_URL as string;
const GET_LENDER_ITEMS_URL = process.env.GET_LENDER_ITEMS_URL as string;
const DELETE_ITEM_URL = process.env.DELETE_ITEM_URL as string;
const BORROW_ITEM_URL = process.env.BORROW_ITEM_URL as string;
const RETURN_ITEM_URL = process.env.RETURN_ITEM_URL as string;
const GET_ITEM_PAGE_URL = process.env.GET_ITEM_PAGE_URL as string;
const GET_ITEM_FROM_ID_URL = process.env.GET_ITEM_FROM_ID_URL as string;
const UPDATE_ACCOUNT_LOCATION_URL = process.env
  .UPDATE_ACCOUNT_LOCATION_URL as string;

export const createListing = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const rawFormData = Object.fromEntries(formData.entries());
  // const rawFormData = {
  //   category: "Other",
  //   condition: "New",
  //   listingTitle: "test",
  //   description: "asd",
  //   tags: "[]",
  //   images: "",
  //   location: "Calgary, AB T3A 7V4",
  //   lenderID: "536b23e7-6546-4c53-8b0b-6a48ea3ad6b6",
  // };
  //   parse and Send to API endpoint
  console.log(rawFormData);
  const response = await fetch(CREATE_LISTING_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  console.log(await response.json());
  // return response.json();
  // redirect("/");
};

export const updateAccountLocation = async (newLocation: LocationInfo) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  console.log("updateAccountLocation");
  const locationString = `${newLocation.city}, ${newLocation.province}, ${newLocation.country}`;
  // @ts-ignore
  const body = { location: locationString, userID: session.userData.userID };
  console.log(body);
  const response = await fetch(UPDATE_ACCOUNT_LOCATION_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 200) {
    const errorMessage =
      "Failed to update account location. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }
  return response.json();
};

export const createUser = async (name: string, email: string) => {
  const body = {
    name: name,
    email: email,
    rating: null,
    bio: null,
    location: { city: null, province: null, country: null },
    phoneNumber: null,
  };
  console.log("createUser");
  const response = await fetch(CREATE_USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const getUser = async (email: string) => {
  const response = await fetch(GET_USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
    },
  });
  return response;
};

export const authenticateUser = async (session: Session) => {
  if (!session.user?.email) {
    return;
  }
  const res = await getUser(session.user?.email);
  if (res.ok) {
    return res;
  } else {
    if (session.user?.name && session.user?.email) {
      const newRes = await createUser(session.user.name, session.user.email);
      return newRes;
    }
  }
};
export const requestItem = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  // send to API endpoint
  redirect("/");
};

export const getBorrowedItems = async (borrowerID: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const response = await fetch(GET_BORROWED_ITEMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      borrowerID: borrowerID,
    },
  });

  if (response.status !== 200) {
    console.error("Failed to return item. Status code: " + response.status);
  }

  const borrowedItems = await response.json();
  return borrowedItems;
};

export const getLenderItems = async (lenderID: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const response = await fetch(GET_LENDER_ITEMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lenderID: lenderID,
    },
  });

  if (response.status !== 200) {
    const errorMessage =
      "Failed to return item. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }

  const lenderItems = await response.json();
  return lenderItems;
};

export const deleteItem = async (itemID: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const response = await fetch(DELETE_ITEM_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      itemID: itemID,
    },
  });

  if (response.status !== 200) {
    const errorMessage =
      "Failed to delete item. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }

  return response;
};

export const borrowItem = async (itemID: string, borrowerID: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const response = await fetch(BORROW_ITEM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemID: itemID,
      borrowerID: borrowerID,
    }),
  });

  if (response.status !== 200) {
    const errorMessage =
      "Failed to borrow item. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }

  return response;
};

export const returnItem = async (itemID: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const response = await fetch(RETURN_ITEM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemID: itemID,
    }),
  });

  if (response.status !== 200) {
    const errorMessage =
      "Failed to return item. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }

  return response;
};

export const getItemPage = async ({
  location = "Calgary",
  pageCount = "10",
  category = "",
  lastItem = "",
  search = "",
}: {
  location?: string;
  pageCount?: string;
  category?: string;
  lastItem?: string;
  search?: string;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session found");
    return;
  }
  const response = await fetch(GET_ITEM_PAGE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      location: location,
      pageCount: pageCount,
      category: category,
      lastItem: lastItem,
      search: search,
    },
  });

  if (response.status !== 200) {
    const errorMessage =
      "Failed to get item page. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }

  const itemPage = await response.json();
  return itemPage;
};

export const getAddress = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getItemFromID = async (itemID: string) => {
  const response = await fetch(GET_ITEM_FROM_ID_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      itemID: itemID,
    },
  });

  if (response.status !== 200) {
    const errorMessage =
      "Failed to get item from id. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }

  const item = await response.json();
  return item;
};

export const searchItemsRedirect = async (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  const searchValue = rawFormData.searchValue;
  const category = rawFormData.category;
  const location = rawFormData.location;
  let searchQuery = "?";
  if (searchValue) {
    searchQuery += `search=${searchValue}&`;
  }
  if (category) {
    searchQuery += `category=${category}&`;
  }
  if (location) {
    searchQuery += `location=${location}&`;
  }
  redirect(`/listings${searchQuery}`);
};
