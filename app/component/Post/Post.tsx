"use client"

import { useEffect, useState } from "react";
import PostBox from "./PostBox"
import PostView from "./PostView"
import Lock from "@/app/component/notify/lock"
import { TypePostView } from "@/app/Type/PostType";
import Link from "next/link";

export default function Post() {
    const [notify, setNotify] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>();
    const [dataPost, setDataPost] = useState<TypePostView[]>([])
    async function getPost() {
        try {
            const token = localStorage.getItem('token')
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/getPost`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            const response = await data.json()
            const status = await data.status
            if (status != 200) {
                
                throw new Error(response.message)
            } else {
                setNotify(false);
                console.log(response);
                
                setDataPost(response)
            }

        } catch (error:any) {
            setErrorMsg(error.message);
            setNotify(true);
        }
    }
    useEffect(() => {
        getPost();
    }, [])
    return (
        <div className="w-full sd:3/4 md:1/2 p-5 flex flex-col items-center justify-center gap-3">
            <Lock show={notify}>
                <div className=" flex justify-center items-center h-full gap-3">
                    {errorMsg}
                    <Link href={"/Auth/Login"} className=" bg-red-700 p-3 w-[120px] rounded hover:bg-red-900 active:hover:bg-red-800">
                        Login
                    </Link>
                </div>

            </Lock>
            <PostBox />

            {dataPost.map((value, i) => (
                <PostView key={i} props={value}></PostView>
            ))
            }

        </div>
    )
}