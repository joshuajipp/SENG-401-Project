'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function HomePage() {

    // --------------------------------------------------------

    const testHomePageItems = [
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
            name: "Robot",
            lender: "Travis Scott",
            lenderRating: "5.0",
            location: "Houston, TX",
            image: "/mech_suit.jpg"
        },
        {
            toolID: 3,
            name: "Crowbar",
            lender: "Lebron James",
            lenderRating: "4.8",
            location: "Los Angeles, CA",
            image: "/Crowbar.jpg"
        },
        {
            toolID: 4,
            name: "Mallet",
            lender: "Goku",
            lenderRating: "4.9",
            location: "Detroit, MI",
            image: "/mallet.jpg"
        },
        {
            toolID: 5,
            name: "Power Saw",
            lender: "Walter White",
            lenderRating: "5.0",
            location: "Vancouver, BC",
            image: "/saw.jpg"
        }
    ]

    // --------------------------------------------------------

    interface ToolItem {
        toolID: any;
        name: any;
        lender: any;
        lenderRating: any;
        location: any;
        image: any;
    }

    const [homePageItems, setHomePageItems] = useState<ToolItem[]>([])

    const getHomePageItems = () => {
        // query database to retrieve some items from the highest rated lenders
        // for now, test data was created in place
        setHomePageItems(testHomePageItems)
    }

    const viewToolDetails = (toolID: any) => {
        // will navigate to the tool details page for whichever tool is clicked on
        // use react router
    }

    useEffect(() => {
        getHomePageItems()
    }, [])

    return (
        <>
            <div className="h-auto w-full">
                <div className="text-6xl text-center font-bold mb-10">Items From Some of our Highest Rated Lenders</div>
                <div className="flex flex-row justify-evenly items-center">
                    {homePageItems.map((tool, index) => {
                        return (
                            <div key={tool.toolID} onClick={() => viewToolDetails(tool.toolID)} className="flex flex-col p-5 border-2 border-brand text-center justify-around items-center rounded-lg hover:cursor-pointer hover:underline w-72 h-96">
                                <header className="font-bold text-3xl">{tool.name}</header>
                                <Image className="rounded-lg border border-black" src={tool.image} alt={tool.name} width={100} height={100} style={{ width: '300px', height: '200px' }}/>
                                <header className="text-base">Lender: {tool.lender} ({tool.lenderRating}☆)</header>
                                <header className="text-base">Location: <span className="text-blue-600">{tool.location}</span></header>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-brand mt-28 rounded-md w-11/12 h-96 flex flex-row justify-center items-center">
                <div className="w-2/3 text-center h-5/6 pl-10 pr-10">
                    <header className="font-bold underline text-2xl mb-8">About Us:</header>
                    <span>
                        Welcome to ToolShed, where community and collaboration meet the power of shared resources.
                        At ToolShed, we believe that every home project is an opportunity to build not just structures but also lasting connections within our neighborhoods.
                        Our platform empowers users to lend and borrow tools for free, fostering a spirit of generosity and cooperation.
                        Whether you are a seasoned DIY enthusiast or a first-time fixer-upper, ToolShed is your go-to destination for unlocking the potential of community-driven tool sharing.
                        Together, let us redefine the way we approach projects and create a network of support that transcends the tools themselves, creating a true sense of shared accomplishment.
                        Join us in building a stronger, more connected community, one borrowed tool at a time.
                        Our vision extends beyond the exchange of tools; it encompasses the idea that together, we can build something greater than the sum of our individual efforts.
                        Let us cultivate a community where collaboration is not just a choice but a way of life. Because here, we believe that when tools are shared, so too is the joy of creating and building a better world, one tool at a time.
                    </span>
                </div>
                <div className="w-1/3 text-center h-5/6 flex justify-center items-center">
                    <Image className="rounded-lg" src="/tools.jpg" alt="tools" width={100} height={100} style={{ width: '350px', height: '300px' }}/>
                </div>
            </div>

            <div className="bg-brand mt-28 rounded-md w-11/12 h-96 flex flex-row justify-center items-center">
                <div className="w-1/3 text-center h-5/6 flex justify-center items-center">
                    <Image className="rounded-lg" src="/happy.jpg" alt="tools" width={100} height={100} style={{ width: '350px', height: '300px' }}/>
                </div>
                <div className="w-2/3 text-center h-5/6 pl-10 pr-10">
                    <header className="font-bold underline text-2xl mb-8">Our Goal:</header>
                    <span>
                        At ToolShed, our goal is to cultivate a vibrant and interconnected community through the power of sharing.
                        We believe that every tool has a story to tell and a purpose to serve, and by fostering a platform where users can lend and borrow tools for free, we aim to create a collaborative environment that transcends the transactional.
                        ToolShed is not just a platform; it is a community-driven initiative promoting generosity, trust, and mutual support.
                        Through sharing tools, we empower our users to connect, learn, and collaborate on various projects. Moreover, we strive to extend our reach beyond mere tool transactions, incorporating a charitable dimension by encouraging users to donate unused tools to those in need, building a stronger, more compassionate community one tool at a time.
                        Join ToolShed, where tools become the catalyst for meaningful connections and positive change.
                        Embrace the spirit of giving, innovation, and camaraderie with ToolShed, where every borrowed drill, saw, or wrench represents a step toward a more connected, compassionate world.
                        Start sharing, start caring - let us work our hardest today so that we may build a better tomorrow!
                    </span>
                </div>
            </div>
        
        </>
    );

}

