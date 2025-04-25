import PostView from "@/app/component/Post/PostView";

import { TypePostView } from "@/app/Type/PostType";
import { ErrorType } from "@/app/Type/Error";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProfilePost() {
    const [data, setData] = useState<TypePostView[]>([])
    const { url } = useParams<{ url: string }>();
    useEffect(() => {
        const getdata = async () => {
            try {
                const reponse = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/GetPostInProfile?url=" + url, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                const status = await reponse.status
                if (status == 200) {
                    const getData: TypePostView[] = await reponse.json()
                    setData(getData)
                    console.log(getData);

                } else {
                    const d: ErrorType = await reponse.json()
                    throw new Error(d.message)
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        getdata();
    }, [])
    return (

        <div className=" w-full flex-col flex items-center gap-3">
            {data.map((value, index) => (

                <PostView props={value} key={index} />

            ))}
            <span className=" h-[60px]"></span>



        </div>
    )
}