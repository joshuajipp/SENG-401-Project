'use client';
import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {

  return (
    <div className="bg-brand h-52 flex flex-col justify-around items-center">
      <div className="h-32 w-full flex justify-around items-center">
        <div className="border-r border-white text-2xl flex-1 w-full text-center h-full"><b><u>Support</u></b><br></br>
          <span className="hover:cursor-pointer hover:underline">toolshedsupport@gmail.com</span><br></br>
          <span className="hover:cursor-pointer hover:underline">+ 1 (587) 889-1865</span>
        </div>
        <div className="border-r border-white text-2xl flex-1 w-full text-center h-full"><b><u>Quick Links</u></b><br></br>
          <span className="hover:cursor-pointer hover:underline">Privacy Policy</span><br></br>
          <span className="hover:cursor-pointer hover:underline">Terms of Use</span><br></br>
          <span className="hover:cursor-pointer hover:underline">FAQ</span>
        </div>
        <div className=" text-2xl flex-1 w-full text-center h-full"><b><u>Follow us on Social Media!</u></b><br></br>
          <div className="w-full h-24 flex justify-around items-end">

            <Link href="https://www.instagram.com/" className="flex flex-col items-center justify-center text-center flex-1 w-full text-base hover:cursor-pointer hover:underline" target="_blank" rel="noopener noreferrer">
              <FaInstagram style={{ fontSize: '3em' }}/><br></br>
              Instagram
            </Link>
            <Link href="https://twitter.com/" className="flex flex-col items-center justify-center text-center flex-1 w-full text-base hover:cursor-pointer hover:underline" target="_blank" rel="noopener noreferrer">
              <FaTwitter style={{ fontSize: '3em' }}/><br></br>
              Twitter
            </Link>
            <Link href="https://www.youtube.com/" className="flex flex-col items-center justify-center text-center flex-1 w-full text-base hover:cursor-pointer hover:underline" target="_blank" rel="noopener noreferrer">
              <FaYoutube style={{ fontSize: '3em' }}/><br></br>
              Youtube
            </Link>

          </div>
        </div>
      </div>
      <div className = "h-14 border-t border-white w-5/6 flex justify-center items-center">Copyright 2024 © ToolShed Inc. All rights reserved.</div>
    </div>

  );
}