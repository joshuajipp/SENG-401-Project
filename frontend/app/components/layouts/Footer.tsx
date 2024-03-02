'use client';
import React from "react";
import Image from "next/image";

export default function Footer() {

  const handleLinkClick = () => {
    window.open("https://youtu.be/dQw4w9WgXcQ?si=za_T96B4cY80JrCf", '_blank');
  };

  return (
    <div className="bg-brand h-52 flex flex-col justify-around items-center">
      <div className="h-32 w-full flex justify-around items-center">
        <div className="border-r border-white text-2xl flex-1 w-full text-center h-full"><b><u>Support</u></b><br></br>
          <span className="hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}>toolshedsupport@gmail.com</span><br></br>
          <span className="hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}>+ 1 (587) 889-1865</span>
        </div>
        <div className="border-r border-white text-2xl flex-1 w-full text-center h-full"><b><u>Quick Links</u></b><br></br>
          <span className="hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}>Privacy Policy</span><br></br>
          <span className="hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}>Terms of Use</span><br></br>
          <span className="hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}>FAQ</span>
        </div>
        <div className=" text-2xl flex-1 w-full text-center h-full"><b><u>Follow us on Social Media!</u></b><br></br>
          <div className="w-full h-24 flex justify-around items-end">

            <div className="flex flex-col items-center justify-center text-center flex-1 w-full text-base hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}><Image src="/instagram.png" alt="instagram" height={50} width={50} style={{ width: '45px', height: '40px' }}/><br></br>
              Instagram
            </div>
            <div className="flex flex-col items-center justify-center text-center flex-1 w-full text-base hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}><Image src="/twitter.png" alt="twitter" height={50} width={50} style={{ width: '45px', height: '35px' }}/><br></br>
              Twitter
            </div>
            <div className="flex flex-col items-center justify-center text-center flex-1 w-full text-base hover:cursor-pointer hover:underline" onClick={()=> handleLinkClick()}><Image src="/youtube.png" alt="youtube" height={50} width={50} style={{ width: '45px', height: '35px' }}/><br></br>
              YouTube
            </div>

          </div>
        </div>
      </div>
      <div className = "h-14 border-t border-white w-5/6 flex justify-center items-center">Copyright 2024 © ToolShed Inc. All rights reserved.</div>
    </div>

  );
}