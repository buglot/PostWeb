import { TypePostView } from "@/app/Type/PostType";
import Link from "next/link";

export default function PostViewProfile({ props }: { props: TypePostView }) {
    return (
        <div className=" flex items-center gap-3 justify-between">
            <Link href={"/app/Profile/" + props.UserUrl} className="bg-gray-200 p-1 z-10 rounded-lg flex items-center gap-3 text-black font-bold">
                <img src={props.Avatar ? props.Avatar : undefined} className=" w-[30px] h-[30px] object-fill rounded-[100%] " alt={""} />
                {props.Name}
            </Link>
            {props.IsMyPost == true ?
                <button className="p-2 w-[60px] hover:bg-gray-200 text-center rounded-full">
                    X
                </button> : ""}
        </div>
    )
}