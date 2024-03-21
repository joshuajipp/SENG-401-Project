'use client';
import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {

  return (
    <div className="bg-brand text-black dark:text-white h-full flex flex-col justify-around items-center">
      <div className="h-full w-full flex flex-row justify-around items-start py-3">
        <div className="border-r border-black dark:border-white text-2xl flex-1 w-full text-center h-full"><b><u>Support</u></b><br></br>
          <span className="hover:cursor-pointer hover:underline">toolshedsupport@gmail.com</span><br></br>
          <span className="hover:cursor-pointer hover:underline">+ 1 (587) 889-1865</span><br></br>
          <span className="hover:cursor-pointer hover:underline">123 Main Street, Calgary AB</span>
        </div>
        <div className="border-r border-black dark:border-white text-2xl flex-1 w-full text-center h-full"><b><u>Quick Links</u></b><br></br>
          <span className="hover:cursor-pointer hover:underline">Privacy Policy</span><br></br>
          <span className="hover:cursor-pointer hover:underline">Terms of Use</span><br></br>
          <span className="hover:cursor-pointer hover:underline">FAQ</span>
        </div>
        <div className=" text-2xl flex-1 w-full text-center h-full"><b><u>Follow us on Social Media!</u></b><br></br>
          <div className="w-full h-full flex justify-around items-end pt-3">

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
      <div className = "h-full border-t border-black dark:border-white w-5/6 flex justify-center items-center py-3">Copyright 2024 © ToolShed Inc. All rights reserved.</div>
    </div>

  );
}