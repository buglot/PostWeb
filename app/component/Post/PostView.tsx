"use client"

import { DataOfAccess } from "@/app/Type/DataPost"
import { Access, Post, TypePostView } from "../../Type/PostType"
import PostViewImage from "./PostViewImage"
import PostViewComment from "./PostViewbarcoment"
import Link from "next/link"
import PostViewProfile from "./PsotViewProfile"
export default function PostView({ props }: { props: TypePostView }) {
    function checkTypePost() {
        return props.TypeofPost == Post.Shop
    }
    function TypeIcon({ TypeofAccess }: { TypeofAccess: string }) {
        const typeaccess = TypeofAccess as Access
        const item = DataOfAccess.find(option => option.value === typeaccess);
        return item?.icon;
    }

    return (
        <div className={`w-full md:w-1/2 flex flex-col p-2 ${checkTypePost() ? "bg-red-500 text-white" : "bg-white text-black"} rounded-md gap-2`}>
            <PostViewProfile props={props} />
            <Link href={"/app/Post/" + props.Url} className=" flex items-center gap-1 text-[13px] hover:underline">
                <TypeIcon TypeofAccess={props.TypeofAccess} />
                {new Date(props.Date).toLocaleDateString().split('T')[0]} {new Date(props.Date).toLocaleTimeString()}
            </Link>
            {props.Message}
            {props.Images &&
                <PostViewImage Images={props.Images}></PostViewImage>
            }
            <PostViewComment type={props.TypeofPost} like={props.Liked} nlike={props.IntLike} url={ props.Url} />
        </div>
    )
}