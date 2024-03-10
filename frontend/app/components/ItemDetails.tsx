'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ItemDetails() {

    // --------------------------------------------------------

    const testItem = {
        toolID: 1,
        name: "Hunting Axe",
        lender: "Jarl Balgruff",
        lenderRating: "4.9",
        location: "Calgary, AB",
        image: "/axe.jpg",
        description: "This axe is the epitome of precision and power for discerning outdoor enthusiasts. Crafted with meticulous attention to detail, this exceptional hunting axe seamlessly blends form and function to deliver an unparalleled cutting experience. Designed for versatility, the axe features a razor-sharp, high-carbon steel blade that effortlessly slices through the toughest materials with surgical precision. The carefully honed edge ensures a clean and efficient cut, making it an indispensable tool for hunters, campers, and outdoor adventurers alike.",
        availability: "Yes",
        damageDeposit: 100
    }

    // --------------------------------------------------------

    interface ToolItem {
        toolID: any;
        name: any;
        lender: any;
        lenderRating: any;
        location: any;
        image: any;
        description: any;
        availability: any;
        damageDeposit: any;
    }

    const [item, setItem] = useState<ToolItem>()

    const getItemDetails = () => {
        // query database to retrieve the information about the selected item, then set it as the "item" variable
        // for now, test data was created in place
        setItem(testItem)
    }

    const handleRentItem = (toolID: any) => {
        // will handle the case where a user clicks on the button to rent an item from a lender
        // use react router
    }

    const viewUserProfile = () => {
        // will navigate to the lender's profile
        // use react router
    }

    useEffect(() => {
        getItemDetails()
    })

    return (
        <>
            <div className="h-auto w-full flex flex-row items-center justify-evenly">

                <div className="w-1/3 border-r border-brand h-screen flex flex-col justify-evenly items-center text-center">
                    <div className="text-6xl font-bold">{item?.name}</div>
                    <div><Image className="rounded-lg border border-black" src={item?.image} alt={"item image"} width={100} height={100} style={{ width: '400px', height: '400px' }}/></div>
                </div>

                <div className="w-2/3 border-l border-brand h-screen flex flex-col justify-evenly items-center text-center">
                    <div className="text-3xl font-bold">
                        Lender:&nbsp;
                        <span className="underline hover:text-brand cursor-pointer" onClick={() => viewUserProfile}>{item?.lender} {item?.lenderRating}☆</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Location:&nbsp;
                        <span className="text-blue-600">{item?.location}</span>
                    </div>
                    <div className="ml-10 mr-10 border-b border-brand text-xl pb-10">
                        {item?.description}
                    </div>
                    <div className="text-2xl">
                        Available To Rent? {item?.availability}
                    </div>
                    <div className="text-2xl">
                        Intial Damage Deposit: ${item?.damageDeposit}
                    </div>
                    <div className="bg-brand rounded-lg px-5 py-5 text-5xl hover:cursor-pointer hover:underline" onClick={() => handleRentItem}>
                        Rent Tool
                    </div>
                </div>



            </div>
        </>
    );

}

