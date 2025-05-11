import { TypePostView } from "@/app/Type/PostType";
import Link from "next/link";

export default function PostViewProfile({ props }: { props: TypePostView }) {
    async function deletePost() {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/delPost", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body:JSON.stringify({Url:props.Url})
        })
        const status = response.status
        if (status == 200) {
            window.location.reload()
        } else {
            const data = await response.json()
            alert(data.message)
        }
    }
    return (
        <div className=" flex items-center gap-3 justify-between">
            <Link href={"/app/Profile/" + props.UserUrl} className="bg-gray-200 p-1 z-10 rounded-lg flex items-center gap-3 text-black font-bold">
                <img src={props.Avatar ? props.Avatar : undefined} className=" w-[30px] h-[30px] object-fill rounded-[100%] " alt={""} />
                {props.Name}
            </Link>
            {props.IsMyPost == true ?
                <button onClick={deletePost} className="p-2 w-[60px] hover:bg-gray-200 text-center rounded-full">
                    X
                </button> : ""}
        </div>
    )
}