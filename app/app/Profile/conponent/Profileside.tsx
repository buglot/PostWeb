"use client"

import { GetProfileContext } from "@/app/Type/ProfileType"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
export default function ProfileView() {
    const data = useContext(GetProfileContext)
    const pathname = usePathname()
    return (
        <div className=" p-2 bg-white w-full md:w-1/3 md:fixed md:h-full flex md:flex-col gap-2 text-black">
            <div typeof="button" className=" group relative flex justify-center items-center flex-col ">
                <a className=" absolute invisible group-hover:visible gap-2  w-full h-full flex justify-center items-center z-20  text-6xl">+</a>
                {data.Avatar ? <img src={data.Avatar} className="p-2 bg-red-500  group-hover:opacity-50  w-[250px] h-[250px] rounded-full object-fill" /> : null}
            </div>
            <div className=" flex flex-col items-center gap-1">
                <a className=" text-white text-xl p-2 bg-red-500 rounded-2xl">{data.Username}</a>
                <a className="p-2 bg-red-300 rounded-2xl">{data.Email}</a>
                <div className=" flex gap-4 *:hover:underline">
                    <a>Follow : 0</a>
                    <a>Following : 0</a>
                </div>
                {data.IsMyProfile  == false && <button className=" bg-red-400 p-3 rounded-2xl text-white hover:bg-red-600 active:bg-red-800 cursor-pointer">
                    Follow
                </button>}
            </div>
            <div className="p-3">
                <h1 className=" font-bold">Shots</h1>
                ความยาว ของความแม่น
            </div>
            <div className=" flex flex-col  *:p-3 *:rounded gap-1">
                <Link href={ pathname+"?page=post" }>Post</Link>
                <a>Store</a>
                <a href={ pathname+"?page=images" }>Images</a>
                <a>About</a>
            </div>

        </div>
    )

}