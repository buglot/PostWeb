"use client"

import { Images } from "@/app/Type/PostType"
import { Dispatch, SetStateAction } from "react"

export default function PostBoxImage({ Images, setImagesUrl }: { Images: Images[], setImagesUrl: Dispatch<SetStateAction<Images[]>> }) {
    return (
        <div className=" flex  gap-2">
            {Images.map((src, index) => (
                <div className=" w-[100px] h-[100px] ">
                    <img
                        key={index}
                        src={src.path}
                        alt={`Pasted ${index}`}
                        className="border rounded w-full h-full"
                    />
                </div>
            ))}
            <button className=" w-[100px] h-[100px] hover:bg-red-900 border rounded">
                +
            </button>
            
        </div>

    )
}