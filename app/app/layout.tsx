"use client"
import { useEffect, useState } from "react";
import MenuNav from "../component/Menubar";
import { defaultUser, User, UserData } from "../Type/User";
import { ErrorType } from "@/app/Type/Error"
import Lock from "../component/notify/lock";
import Link from "next/link";
import { NotifyContext, notifyType } from "../Type/notify";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [data, setData] = useState<User>(defaultUser)
    const [nofi, setNotify] = useState<boolean>(false);
    const [msgError, setMsgError] = useState<string>("");
    const no:notifyType = {setNotify,setMsgError}
    useEffect(() => {
        const getdata = async () => {
            try {
                const responese = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/Profile", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                const status = await responese.status
                const data: User = await responese.json()
                if (status == 200) {
                    setData(data)
                } else {
                    const data: ErrorType = await responese.json()
                    throw new Error(data.message)
                }
                console.log(data);
            } catch (error: any) {
                setMsgError(error?.message)
                setNotify(true);
            }
        }
        getdata()
    }, [])
    return (
        <NotifyContext.Provider value={no} >
            <UserData.Provider value={data}>
                <Lock show={nofi}>
                    <div className=" flex justify-center items-center h-full gap-3">
                        {msgError}
                        <Link href={"/Auth/Login"} className=" bg-red-700 p-3 w-[120px] rounded hover:bg-red-900 active:hover:bg-red-800">
                            Login
                        </Link>
                    </div>
                </Lock>
                <MenuNav />
                {children}
            </UserData.Provider>
        </NotifyContext.Provider>

    )
}