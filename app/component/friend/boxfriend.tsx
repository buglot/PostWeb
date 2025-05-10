import { User } from "@/app/Type/User";
import Link from "next/link";
import { useState } from "react";

export default function BoxFriend({ props, online }: { props: User, online: boolean }) {
    return (
        <div className={`text-black flex flex-col w-full ${online?"bg-white":"bg-gray-600"} gap-1 `} >
            <input type="checkbox" className="peer hidden " id={"toggle-"+props.Username}></input>
            <label className=" flex flex-row gap-1 p-1 items-center cursor-pointer hover:bg-gray-300"
            htmlFor={"toggle-"+props.Username}>
                <img src={props.Avatar} className=" rounded-full object-fill w-[60px] h-[60px] "></img>
                <a className=" text-md ">{props.Username}</a>
            </label>
            <div className=" peer-checked:flex hidden *:p-2 *:hover:bg-gray-200 peer-checked:flex-col ">
                <Link href={""}>Messages</Link>
                <Link href={props.Url ? "" : ""}>Profiles</Link>

            </div>

        </div>
    )
}