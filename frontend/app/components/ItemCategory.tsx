'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ItemCategory() {

    // --------------------------------------------------------

    const testCategoryItems = [
        {
            toolID: 1,
            name: "Hunting Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 2,
            name: "Woodcutting Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 3,
            name: "Hatchet",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 4,
            name: "Fire Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 5,
            name: "Carpenter Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 6,
            name: "Tomahawk Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 7,
            name: "Felling Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        },
        {
            toolID: 8,
            name: "Hunting Axe",
            lender: "Jarl Balgruff",
            lenderRating: "4.9",
            location: "Calgary, AB",
            image: "/axe.jpg"
        }
    ]

    const testCategoryName = "Axes"

    // --------------------------------------------------------

    interface ToolItem {
        toolID: any;
        name: any;
        lender: any;
        lenderRating: any;
        location: any;
        image: any;
    }

    const [categoryName, setCategoryName] = useState("")

    const [categoryItems, setCategoryItems] = useState<ToolItem[]>([])

    const getItemsInCategory = () => {
        setCategoryName(testCategoryName)
        // query database to retrieve the items from the selected category
        // for now, test data was created in place
        setCategoryItems(testCategoryItems)
    }

    const viewToolDetails = (toolID: any) => {
        // will navigate to the tool details page for whichever tool is clicked on
        // use react router
    }

    useEffect(() => {
        getItemsInCategory()
    })

    return (
        <>
            <div className="h-auto w-full">
                <div className="text-6xl text-center font-bold mb-10">Selected Category: {categoryName}</div>
                <div className="flex flex-row flex-wrap justify-evenly items-center w-full overflow-auto">
                    {categoryItems.map((tool, index) => {
                        return (
                            <div key={tool.toolID} onClick={() => viewToolDetails(tool.toolID)} className="flex flex-col p-5 border-2 border-brand text-center justify-around items-center rounded-lg hover:cursor-pointer w-80 h-96 mb-10 ml-10 mr-10">
                                <header className="font-bold text-3xl">{tool.name}</header>
                                <Image className="rounded-lg border border-black" src={tool.image} alt={tool.name} width={100} height={100} style={{ width: '300px', height: '200px' }}/>
                                <header className="text-base">Lender: {tool.lender} ({tool.lenderRating}☆)</header>
                                <header className="text-base">Location: <span className="text-blue-600">{tool.location}</span></header>
                                <div className="bg-brand rounded-lg px-3 hover:underline">See Details</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        
        </>
    );

}

