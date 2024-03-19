'use client';
import React from "react";
import { AiFillTool } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaHandHoldingHand } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function AboutWebsite() {

    return (
        <>

            <div className="text-6xl text-center font-extrabold">More About ToolShed!</div>

            <div className="border border-brand mt-20 rounded-lg w-full h-96 flex flex-row justify-center items-center">
                <div className="w-2/3 text-center h-5/6 pl-10 pr-10">
                    <header className="font-bold underline text-2xl mb-8">What exactly is ToolShed?</header>
                    <span className="text-xl">
                        ToolShed is a web service created for the purpose of building a community around the sharing of tools for those in need of them, by providing users the funcionality and simplicity to effectively borrow and lend tools between one another.
                        ToolShed eliminates the need to invest in expensive tools and appliances by building a sense of community around sharing and lending, also reducing unnecessary consumption and waste, promoting sustainability.
                        Ultimately, ToolShed is a community sharing platform, specifically tailored for tools and appliances and the primary goal is to foster sustainability and community engagement by facilitating the borrowing and lending of items within local communities.

                    </span>
                </div>
                <div className="w-1/3 text-center h-5/6 flex justify-center items-center">
                    <AiFillTool style={{ fontSize: '15em' }}/>
                </div>
            </div>

            <div className="border border-brand mt-20 rounded-md w-full h-96 flex flex-row justify-center items-center">
                <div className="w-1/3 text-center h-5/6 flex justify-center items-center">
                    <FaUsers style={{ fontSize: '15em' }}/>
                </div>
                <div className="w-2/3 text-center h-5/6 pl-10 pr-10">
                    <header className="font-bold underline text-2xl mb-8">Why should you use ToolShed?</header>
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

            <div className="border border-brand mt-20 rounded-lg w-full h-full flex flex-col justify-around items-center pt-10">

                <div className="w-11/12 text-center pl-10 pr-10 pb-10 border-b border-brand">
                    <header className="font-bold underline text-2xl mb-8">How can you use ToolShed?</header>
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

                <div className="text-center h-auto w-full flex flex-row justify-evenly items-center pt-10 pb-10">
                    <div className="w-1/2 border-r border-brand h-80 flex flex-col justify-evenly items-center text-center px-10">
                        <div className="text-3xl font-bold underline">Borrowing Tools:</div>
                        <FaHandHoldingHand style={{ fontSize: '7em' }}/>
                        <span>
                            Text
                        </span>
                    </div>
                    <div className="w-1/2 border-l border-brand h-80 flex flex-col justify-evenly items-center text-center">
                        <div className="text-3xl font-bold underline">Lending Tools:</div>
                        <FaHandHoldingHeart style={{ fontSize: '7em' }}/>
                        <span>
                            Text
                        </span>
                    </div>
                </div>

            </div>

        </>
    );

}