"use client"

import { DataOfAccess, DataOfPost } from "@/app/Type/DataPost"
import { Access, Post, TypePostView } from "../../Type/PostType"

export default function PostView({ props }: { props: TypePostView }) {
    function checkTypePost() {
        return props.TypeofPost == Post.Store
    }
    function TypeIcon({ TypeofAccess}:{TypeofAccess:string}) {
        const typeaccess = TypeofAccess as Access
        const item = DataOfAccess.find(option => option.value === typeaccess);
        return item?.icon;
    }
    
    return (
        <div className={` flex flex-col w-1/2 p-2 ${checkTypePost() ? "bg-red-500" : "bg-white"} rounded-md gap-2`}>
            <div className=" flex items-center gap-3 justify-between">
                <div className="bg-gray-200 p-1 rounded-lg flex items-center gap-3 text-black font-bold">
                    <img src={props.Avatar} className=" w-[30px] h-[30px] object-fill rounded-[100%] " />
                    {props.Name}
                </div>
                
            </div>
            <div className=" flex items-center gap-1 text-[13px]">
                <TypeIcon TypeofAccess={props.TypeofAccess} />
                {new Date(props.date).toLocaleDateString().split('T')[0]} {new Date(props.date).toLocaleTimeString()}
            </div>
            {props.message}
        </div>
    )
}