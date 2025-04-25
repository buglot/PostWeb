"use client"

import { DataOfAccess} from "@/app/Type/DataPost"
import { Access, Post, TypePostView } from "../../Type/PostType"
import PostViewImage from "./PostViewImage"
import PostViewComment from "./PostViewbarcoment"
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
            <div className=" flex items-center gap-3 justify-between">
                <div className="bg-gray-200 p-1 rounded-lg flex items-center gap-3 text-black font-bold">
                    <img src={props.Avatar ? props.Avatar : ""} className=" w-[30px] h-[30px] object-fill rounded-[100%] " alt={""} />
                    {props.Name}
                </div>

            </div>
            <div className=" flex items-center gap-1 text-[13px] ">
                <TypeIcon TypeofAccess={props.TypeofAccess}/>
                {new Date(props.Date).toLocaleDateString().split('T')[0]} {new Date(props.Date).toLocaleTimeString()}
            </div>
            {props.Message}
            <PostViewImage Images={props.Images}></PostViewImage>
            <PostViewComment type={props.TypeofPost } />
        </div>
    )
}