import { User } from "@/app/Type/User";
import Link from "next/link";

export default function BoxViewProfile({ props }: { props: User }) {
    return <Link href={"/app/Profile/" + props.Url} className=" flex flex-col hover:bg-red-800 rounded p-2 w-[200px]">
        <div className=" flex items-center gap-2 ">
            {props.Avatar && <img src={props.Avatar} className=" w-[100px] h-[100px] rounded-full bg-white" alt={"profile-" + props.Url}></img>}
            <div className=" flex flex-col">
                <p>{props.Username}</p>
                {props.Email}
            </div>

        </div>

    </Link>
}