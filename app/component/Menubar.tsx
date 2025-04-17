"use client"

import Link from "next/link"
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function MenuNav() {
    return (
        <nav className=" h-[60px] w-screen text-white flex bg-red-500 pr-4 pl-4 items-center justify-between">
            <div  className="flex gap-5 items-center">
                logo
                <input type="text" className="text-[16px] bg-red-900 p-1 rounded-md text-white"/>
            </div>
            <div className="flex gap-2 h-full">
                <Link href={"/"} className=" w-[90px]  hover:bg-red-400 justify-center flex items-center">
                    <HomeIcon />
                </Link>
                <Link href={"/Store"} className="w-[90px] hover:bg-red-400 justify-center flex items-center">
                    <StoreIcon/>
                </Link>
            </div>
            <div className="flex gap-2 h-full">
                <Link href={"/Chat"} className=" w-[90px]  hover:bg-red-400 justify-center flex items-center">
                <ChatIcon/>
                </Link>
                <Link href={"/profile"} className=" w-[90px]  hover:bg-red-400 justify-center flex items-center">
                <AccountCircleIcon/>
                </Link>
            </div>
        </nav>
    )
}