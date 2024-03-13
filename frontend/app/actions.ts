"use server";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

const CREATE_USER_URL =
  "https://gporbws4heru7rlgqtgbfegx4a0svrhp.lambda-url.ca-central-1.on.aws/";

const GET_USER_URL =
  "https://v5ezikbdjg4hadx5mqmundbaxq0zjdnj.lambda-url.ca-central-1.on.aws/";

const CREATE_LISTING_URL =
  "https://evieebr3t3elnuixwsaa32lp7m0fbfre.lambda-url.ca-central-1.on.aws/";

const GET_BORROWED_ITEMS_URL = 
  "https://tot5q6oh7lsjo3xgfzsu4rtbhy0zznxz.lambda-url.ca-central-1.on.aws/";

const GET_LENDER_ITEMS_URL =
  "https://iat6gyr54ckeyk532ukyqqqx6m0blqpr.lambda-url.ca-central-1.on.aws/";

const DELETE_ITEM_URL =
  "https://42klw4pzml6aqrxcaufnk2d5gq0ivpml.lambda-url.ca-central-1.on.aws/";

const BORROW_ITEM_URL = 
  "https://kjqor37l3b7q6yymuewr7enudy0dvgef.lambda-url.ca-central-1.on.aws/";

const RETURN_ITEM_URL =
  "https://gpd2zooxjwtnoqjxgsaxwvgjni0lfpkn.lambda-url.ca-central-1.on.aws/";

const GET_ITEM_PAGE_URL = 
  "https://hb6atawovzyta4acaj4bkd4rxa0pmhvp.lambda-url.ca-central-1.on.aws/";

export const createListing = async (formData: FormData) => {
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
  const body = {
    email: email,
  };
  const response = await fetch(GET_USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const authenticateUser = async (session: Session) => {
  const res = await getUser(session.user?.email || "");
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
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  // send to API endpoint
  redirect("/");
};

export const getBorrowedItems = async (borrowerID: string) => {
  const response = await fetch(GET_BORROWED_ITEMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "borrowerID": borrowerID,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to return item. Status code: ' + response.status);
  }

  const borrowedItems = await response.json();
  return borrowedItems;
};

export const getLenderItems = async (lenderID: string) => {
  const response = await fetch(GET_LENDER_ITEMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "lenderID": lenderID,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to return item. Status code: ' + response.status);
  }

  const lenderItems = await response.json();
  return lenderItems;
};

export const deleteItem = async (itemID: string) => {
  const response = await fetch(DELETE_ITEM_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "itemID": itemID,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to return item. Status code: ' + response.status);
  }

  return response;
};

export const borrowItem = async (itemID: string, borrowerID: string) => {
  const response = await fetch(BORROW_ITEM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemID: itemID,
      borrowerID: borrowerID,
    })
  });

  if (response.status !== 200) {
    throw new Error('Failed to return item. Status code: ' + response.status);
  }

  return response;
}
  
export const returnItem = async (itemID: string) => {
  const response = await fetch(RETURN_ITEM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemID: itemID,
    })
  });

  if (response.status !== 200) {
    throw new Error('Failed to return item. Status code: ' + response.status);
  }

  return response;
}

export const getItemPage = async (
  location: string, 
  pageCount: string = '10', 
  category: string = '', 
  lastItem: string = '', 
  search: string = ''
) => {
  const response = await fetch(GET_ITEM_PAGE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "location": location,
      "pageCount": pageCount,
      "category": category,
      "lastItem": lastItem,
      "search": search,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to return item. Status code: ' + response.status);
  }

  const itemPage = await response.json();
  return itemPage;
};