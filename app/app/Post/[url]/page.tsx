"use client"
import { useParams, useRouter } from "next/navigation";

export default function PagePost() {
    const { url } = useParams<{ url: string }>();
    const nav = useRouter()
    const onBck= async() => {
        nav.back()
    }
    return (
        <div className=" w-full h-full p-3">
            <button onClick={onBck} className=" absolute w-[60px] h-[60px] rounded-full bg-red-200 text-black hover:bg-red-400">
                X
            </button>
        </div>
    )
}