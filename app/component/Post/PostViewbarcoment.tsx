"use client";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Post } from '@/app/Type/PostType';
import { checkLike } from '@/app/Type/LikeCheck';
import { useState } from 'react';
import { LikeSend } from '@/app/Type/Like';
import Link from 'next/link';
export default function PostViewComment({ type, like, url, nlike }: { type: string, like: boolean, url: string,nlike:number }) {
    const [datalike, setLike] = useState<LikeSend>({ Like:like,LikeCount:nlike})
    function checkTypePost() {
        return type == Post.Shop
    }
    async function doLike() {

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/like", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ url: url })
        })
        const status = await response.status
        if (status == 200) {
            const data :LikeSend = await response.json()
            setLike(data)
        }
    }
    return (
        <div className=' flex justify-between h-[60px] w-full'>
            <button onClick={doLike} className={` p-3 ${checkTypePost() ? "hover:bg-red-400" : "hover:bg-gray-400"} ${datalike.Like?"bg-blue-500":""} transition flex justify-center items-center w-1/3 rounded-md`}>
                <ThumbUpIcon /> {checkLike(datalike.LikeCount)} Like
            </button>
            <Link href={"/app/Post/" + url} className={` p-3 ${checkTypePost() ? "hover:bg-red-400" : "hover:bg-gray-400"} transition flex justify-center items-center w-1/3 rounded-md`}>
                <CommentIcon /> Comment
            </Link>
            <a className={` p-3 ${checkTypePost() ? "hover:bg-red-400" : "hover:bg-gray-400"} transition flex justify-center items-center w-1/3 rounded-md`}>
                <ShareIcon /> Share
            </a>

        </div>
    )
}