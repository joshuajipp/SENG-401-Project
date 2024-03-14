"use server";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./utils/authOptions";

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

export const createUser = async (name: string, email: string) => {
  const body = {
    name: name,
    email: email,
    rating: null,
    bio: null,
    location: null,
    phoneNumber: null,
  };
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
    throw new Error("Failed to return item. Status code: " + response.status);
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
    throw new Error("Failed to return item. Status code: " + response.status);
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
    throw new Error("Failed to return item. Status code: " + response.status);
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
    throw new Error("Failed to return item. Status code: " + response.status);
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
    throw new Error("Failed to return item. Status code: " + response.status);
  }

  return response;
};

export const getItemPage = async ({
  location,
  pageCount = "10",
  category = "",
  lastItem = "",
  search = "",
}: {
  location: string;
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
    throw new Error("Failed to return item. Status code: " + response.status);
  }

  const itemPage = await response.json();
  return itemPage;
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
    throw new Error("Failed to return item. Status code: " + response.status);
  }

  const item = await response.json();
  return item;
};
