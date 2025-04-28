"use client"
import { CommentSend } from "@/app/Type/Comment";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Comment() {
    const { url } = useParams<{ url: string }>();
    const text = useRef<HTMLInputElement>(null);
    const [data, setdata] = useState<CommentSend[]>([])
    const [dataget, setDataget] = useState(5)
    const nav = useRouter()
    const commant = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/comment", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ Url: url, Message: text.current!.value })
        })
        const status = response.status
        if (status == 200) {
            window.location.reload()
        }
    }
    useEffect(() => {
        const getcomment = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/GetComments?url=${url}&l=${dataget}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            const status = await response.status
            if (status == 200) {
                const data: CommentSend[] = await response.json()
                console.log(data);
                
                setdata(data)
            }
        }
        getcomment();
    }, [])
    return (
        <div className="p-2 rounded-tr-2xl  rounded-br-2xl w-1/3 bg-red-500 text-white ">
            <div className=" text-2xl">
                Comment
            </div>
            <div className=" w-full  flex-col gap-4  overflow-auto  h-[calc(100%-30px)]">
                <form onSubmit={(e) => { e.preventDefault(); commant(); }} className="w-full flex flex-col">
                    <TextField inputRef={text}></TextField>
                </form>
                <div className=" w-full flex-col flex gap-4 h-full overflow-hidden">
                {data && data.map((v) => (
                    <div className=" flex items-center gap-3 text-wrap w-full ">
                        <Link href={"/app/Profile/" + v.UserUrl} className="bg-gray-200 p-1 z-10 rounded-lg flex items-center gap-3 text-black font-bold">
                            <img src={v.Avatar} className=" w-[30px] h-[30px] object-fill rounded-[100%] " alt={""} />
                            {v.UserName}
                        </Link>
                        {v.Message}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}