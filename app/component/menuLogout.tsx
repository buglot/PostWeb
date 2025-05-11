"use client"

import { useContext } from "react";
import { UserData } from "../Type/User";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Menuout() {
    const data = useContext(UserData)
    const nav = useRouter()
    const deletetoken = () => {
        window.localStorage.removeItem("token")
        nav.push("/");
    }
    return (
        <div className="peer-checked:flex hidden ">
            <div className="flex gap-4 items-center *:h-full *:p-1 *:hover:bg-red-400 *:active:bg-red-600">
                <Link href={`/app/Profile/${data.Url}`} className=" flex items-center gap-1 ">
                    {data.Avatar != "" ? <img src={data.Avatar} alt="profileimage" className=" bg-white rounded-full w-[40px]  h-[40px]"></img>
                        : ""}

                    Profile
                </Link>
                <button onClick={deletetoken} >
                    Logout
                </button>
            </div>
        </div>
    )
}