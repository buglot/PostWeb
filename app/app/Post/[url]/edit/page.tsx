"use client";

import {  TypePostView } from "@/app/Type/PostType";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Edit() {
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
        IntLike: 0,
    })
    const [loading, setLoading] = useState<boolean>(true);
    const { url } = useParams<{ url: string }>();
    const [postImages, setPostImages] = useState<{ img: string, url: string }[]>([])
    // function TypeIcon({ TypeofAccess }: { TypeofAccess: string }) {
    //     const typeaccess = TypeofAccess as Access
    //     const item = DataOfAccess.find(option => option.value === typeaccess);
    //     return item?.icon;
    // }
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
                const loadImg = async () => {
                    if (data.Images != null) {
                        const image = await Promise.all(
                            data.Images.map(async (value) => {
                                return new Promise<{ img: string, url: string }>(async (resolve, reject) => {
                                    const responese = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/img/" + value, {
                                        headers: {
                                            Authorization: `Bearer ${window.localStorage.getItem("token")}`
                                        }
                                    })
                                    const data = await responese.blob();
                                    const status = await responese.status
                                    if (status == 200) {
                                        const url = URL.createObjectURL(data);
                                        resolve({ img: url, url: value })
                                    } else {
                                        reject("error")
                                    }
                                }
                                )
                            })
                        )
                        setPostImages(image)
                    } else {
                        setPostImages([])
                    }
                }
                await loadImg()
            }
            setLoading(false)
        }
        post();
    }, [])
    const deleteimg = (url: string) => {
        setProps((data) => ({ ...data, Images: data.Images?.filter((url1) => url1 != url) }))
        setPostImages((data) => (data.filter((v) => v.url != url)))
    }
    if (loading) {
        return <div className=" flex flex-1 text-5xl items-center justify-center">Loading...</div>
    }
    async function save() {
        console.log({
            message: props.Message,
            typeofPostname: props.TypeofPost,
            accessname: props.TypeofAccess,
            images: props.Images,
            Url:props.Url
        })
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/edit", {
            method: "POST",
            headers: {
                Authorization:"Bearer "+localStorage.getItem("token")
            },
            body: JSON.stringify({
                message: props.Message,
                typeofPostname: props.TypeofPost,
                accessname: props.TypeofAccess,
                images: props.Images,
                Url:props.Url
            })
        })
        const status = await response.status
        const data = await response.json()
        if (status == 200) {
            
            alert(data.message)
        } else {
            alert(data.message)
        }
    }
    if (props.IsMyPost == false) {
        return <div className=" text-2xl flex flex-1 items-center justify-center flex-col">
            You dont have premission
            <Link href={"/"} className=" text-xl hover:underline ">Back to main page.</Link>
        </div>
    }
    return <div className=" p-2 flex flex-col flex-1">
        <textarea value={props.Message} onChange={(e) => {
            setProps((data) => ({ ...data, Message: e.target.value }))
        }} className=" bg-white text-black p-2  text-2xl">
        </textarea>
        {postImages.map((v, i) => (
            <div key={i}>
                <button onClick={() => {
                    deleteimg(v.url)
                }}>x</button>
                <img src={v.img} key={i} alt={"img-post-" + props.Url + "-" + i}></img>
            </div>
        ))}

        <button className=" bg-red-400 h-[60px]" onClick={() => {
            if (confirm("are you sure for saving?")) {
                save();
            }
        }}>save</button>

    </div>
}