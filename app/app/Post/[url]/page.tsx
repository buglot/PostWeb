"use client"
import PostViewImage from "@/app/component/Post/PostViewImage";
import { DataOfAccess } from "@/app/Type/DataPost";
import { Access, Post, TypePostView } from "@/app/Type/PostType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Comment from "../component/Comment";
import PostViewProfile from "@/app/component/Post/PsotViewProfile";

export default function PagePost() {
    const [props, setProps] = useState<TypePostView>({
        Name: "",
        UserUrl: "",
        Avatar: "",
        TypeofAccess: "",
        TypeofPost: "",
        Message: "asdsadsad",
        Date: 0,
        IsMyPost: true,
        Url: "",
        Liked: false,
        IntLike:0,
    })
    const { url } = useParams<{ url: string }>();
    
    function TypeIcon({ TypeofAccess }: { TypeofAccess: string }) {
        const typeaccess = TypeofAccess as Access
        const item = DataOfAccess.find(option => option.value === typeaccess);
        return item?.icon;
    }
    function checkTypePost() {
        return props.TypeofPost == Post.Shop
    }
    useEffect(() => {
        const post = async() => {
            const responese = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/PostUrl?url=" + url, {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token"),
                }
            })
            const status = await responese.status
            if (status == 200) {
                const data: TypePostView = await responese.json()
                setProps(data);
                console.log(data);
            }
        }
        post();
    }, [])
    const nav = useRouter()
    const onBck = async () => {
        nav.back()
    }
    return (
        <div className=" w-full flex-1 p-3 justify-center flex">
            <button onClick={onBck} className="left-3 absolute w-[60px] h-[60px] rounded-full bg-red-200 text-black hover:bg-red-400">
                X
            </button>
            <div className={`w-full md:w-1/2 flex flex-col p-2 ${checkTypePost() ? "bg-red-500 text-white" : "bg-white text-black"} rounded-tl-md rounded-bl-md gap-2`}>
               <PostViewProfile props={props} />
                <div className=" flex items-center gap-1 text-[13px] ">
                    <TypeIcon TypeofAccess={props.TypeofAccess} />
                    {new Date(props.Date).toLocaleDateString().split('T')[0]} {new Date(props.Date).toLocaleTimeString()}
                </div>
                {props.Message}
                {props.Images && <PostViewImage Images={props.Images}></PostViewImage>}
            </div>
            <Comment />
        </div>
    )
}