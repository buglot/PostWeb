"use client"
import PostViewImage from "@/app/component/Post/PostViewImage";
import { DataOfAccess } from "@/app/Type/DataPost";
import { Access, Post, TypePostView } from "@/app/Type/PostType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Comment from "../component/Comment";
import PostViewProfile from "@/app/component/Post/PsotViewProfile";
import Link from "next/link";

export default function PagePost() {
    const [props, setProps] = useState<TypePostView>({
        Name: "",
        UserUrl: "",
        Avatar: "",
        TypeofAccess: "",
        TypeofPost: "",
        Message: "",
        Date: 0,
        IsMyPost: true,
        Url: "",
        Liked: false,
        IntLike:0,
    })
    const [loading, setLoading] = useState<boolean>(true);
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
        const post = async () => {
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
            setLoading(false)
        }
        post();
    }, [])
    const nav = useRouter()
    const onBck = async () => {
        nav.back()
    }
    if (loading) {
        return <div className=" flex flex-1 text-5xl items-center justify-center">Loading...</div>
    }
    if (props.UserUrl == "") {
        return <div className=" text-5xl text-white flex flex-col items-center justify-center flex-1">
            This post has Deleted or you don&apost havve premission.
            <Link href={"/"} className=" underline hover:text-gray-100">Back to the main pages.</Link>
        </div>
    }
    return (
        <div className=" w-full flex-1 p-3 justify-center flex">
            <button onClick={onBck} className="left-3 absolute w-[60px] h-[60px] rounded-full bg-red-200 text-black hover:bg-red-400">
                X
            </button>
            <div className={`w-full md:w-1/2 flex flex-col p-2 ${checkTypePost() ? "bg-red-500 text-white" : "bg-white text-black"} rounded-tl-md rounded-bl-md gap-2`}>
                <PostViewProfile props={props} />
                {props.IsMyPost&&<Link href={url+"/edit"} className="hover:bg-red-300 active:bg-red-400">edit</Link>}
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