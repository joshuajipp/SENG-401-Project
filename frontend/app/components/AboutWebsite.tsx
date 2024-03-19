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
                    <header className="font-bold underline text-3xl mb-8">What exactly is ToolShed?</header>
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
                    <header className="font-bold underline text-3xl mb-8">Why should you use ToolShed?</header>
                    <span className="text-xl">
                        Using ToolShed offers a myriad of benefits beyond mere tool sharing. Firstly, it fosters a sense of community by connecting individuals with a shared ethos of cooperation and mutual aid.
                        By facilitating the lending and borrowing of tools, ToolShed not only reduces costs and environmental impact but also promotes a culture of resourcefulness and sustainability.
                        Moreover, it encourages collaboration and strengthens social bonds within neighborhoods or among like-minded individuals.
                        With ToolShed, users not only gain access to a diverse range of tools but also become part of a supportive network where assistance is readily available, fostering a culture of reciprocity and goodwill.
                        Ultimately, ToolShed empowers its users to not only access the tools they need but also to contribute to a more connected, resilient, and environmentally conscious community.
                    </span>
                </div>
            </div>

            <div className="border border-brand mt-20 rounded-lg w-full h-full flex flex-col justify-around items-center pt-10">

                <div className="w-11/12 text-center pb-10 border-b border-brand">
                    <header className="font-bold underline text-3xl mb-8">How can you use ToolShed?</header>
                    <span className="text-xl">
                        Understanding how to use ToolShed can be simplified down to understanding its 2 primary services, those being borrowing tools, and lending them.
                        <br></br><br></br>
                        Below you can find step-by-step tutorials on the process of how the ToolShed website allows users to access these services through a simple and efficient interface.
                    </span>
                </div>

                <div className="text-center h-full w-full flex flex-row justify-evenly items-start pt-10 pb-10">
                    <div className="w-1/2 h-full flex flex-col justify-evenly items-center text-center px-10">
                        <div className="text-3xl font-bold underline mb-10">How to Borrow Tools:</div>
                        <FaHandHoldingHand style={{ fontSize: '7em' }}/>
                        <ol className="list-inside list-decimal text-xl mt-10">
                            <li className="mb-5">Select one of the tool categories in the website header to view a list of available tools in that category.</li>
                            <li className="mb-5">If you see a tool you would like to borrow, you can click on that tool to see some more details, such as a description, the initial damage deposit, which is a temporary down payment that will be returned to you if the tool is returned back to the lender undamaged, and more information about the tool!</li>
                            <li className="mb-5">Once you find a tool that is to your liking, you can submit a request to borrow it, and a notification will be sent to the lender.</li>
                            <li className="mb-5">If the lender accepts your request, the down payment will be submitted and you get to borrow the tool for the specified duration!</li>
                            <li className="mb-5">Finally, make sure you return the tool on time and with no major damages back to the lender, and your down payment will be returned. Each user has a rating and depending on if the lender was happy with the arrangement, your rating may go up, making it more likely for your borrow requests to be accepted in the future! You may also rate the lender based on your experience with them and their tool.</li>
                        </ol>
                    </div>
                    <div className="w-1/2 border-l border-brand h-full flex flex-col justify-evenly items-center text-center px-10">
                        <div className="text-3xl font-bold underline mb-10">How to Lend Tools:</div>
                        <FaHandHoldingHeart style={{ fontSize: '7em' }}/>
                        <ol className="list-inside list-decimal text-xl mt-10">
                            <li className="mb-5">Select the <q>List Items</q> option on the right of the website header to view the simple interface that allows you to list one of your tools on ToolShed.</li>
                            <li className="mb-5">Enter the necessary information about the tool you are lending, such as a picture, a description, the initial damage deposit, which is a temporary down payment the borrower must pay that you may set to help ensure that your tool is returned back to you in a timely manner undamaged, and more information about the tool!</li>
                            <li className="mb-5">Once you list your tool on ToolShed, you will receive notifications for requests from borrowers if they are interested in your tool, along with their ratings, and you may decide which borrower to lend your tool to.</li>
                            <li className="mb-5">Once you accept a request from a borrower, their down payment will be submitted and they will borrow your tool for the specified duration!</li>
                            <li className="mb-5">Finally, once a borrower reaches the end of their duration, it is up to them to return the tool on time and with no major damages back to you, if they want their down payment to be returned. If the borrower was happy with the arrangement and the quality of the tool, your rating may go up, making it more likely for your borrowers to request tools from you in the future! You may also rate the borrower based on your experience with them and the shape that the tool was returned in.</li>
                        </ol>
                    </div>
                </div>

            </div>

        </>
    );

}