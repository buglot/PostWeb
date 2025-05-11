"use client"

import Link from "next/link"
import HomeIcon from '@mui/icons-material/Home';
//import StoreIcon from '@mui/icons-material/Store';
//import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menuout from "./menuLogout";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function MenuNav() {
    const input = useRef<HTMLInputElement>(null);
    const nav = useRouter()
    const searchdata = ()=>{
        nav.push("/app/find?name="+input.current?.value)
    }
    return (
        <nav className=" h-[60px] w-screen text-white flex bg-red-500 pr-4 pl-4 items-center justify-between">
            <div className="flex gap-5 items-center">
                logo
                <form onSubmit={(e)=>{e.preventDefault();searchdata();}}>
                    <input type="text" ref={input} className="text-[16px] bg-red-900 p-1 rounded-md text-white" />
                </form>
                
            </div>
            <div className="flex gap-2 h-full">
                <Link href={"/app"} className=" w-[90px]  hover:bg-red-400 justify-center flex items-center">
                    <HomeIcon />
                </Link>
                {/* <Link href={"/app/Store"} className="w-[90px] hover:bg-red-400 justify-center flex items-center">
                    <StoreIcon />
                </Link> */}
            </div>
            <div className="flex gap-2 h-full">
                {/* <Link href={"/Chat"} className=" w-[90px]  hover:bg-red-400 justify-center flex items-center">
                    <ChatIcon />
                </Link> */}
                <input type="checkbox" className="peer hidden " id={"showmenupandout"}></input>
                <label htmlFor="showmenupandout" className=" w-[90px]  hover:bg-red-400 justify-center flex items-center">

                    <AccountCircleIcon />
                    
                </label>
                <Menuout/>
            </div>
        </nav>
    )
}