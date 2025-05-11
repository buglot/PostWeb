import { useContext } from "react"
import { UserData } from "../Type/User"
import Link from "next/link"

export default function SideBar() {
    const data = useContext(UserData)
    console.log(data);
    if (!data.Username) {
        <div>Loading...</div>
    }
    return (
        <div className=" hidden md:w-1/6 bg-black md:flex flex-col sideber p-3">
            <Link href={data.Url ? "/app/Profile/" + data.Url : ""} className=" text-[17px] flex gap-5  rounded-md hover:bg-red-950">
                {data.Avatar !== "" ? (
                    <img src={data.Avatar} alt="profile" className="p-2 bg-white rounded-[100%] w-[60px] h-[60px] object-fill"  />
                ) : null}
                {data.Username}
            </Link >
            <a className="flex">Desboard</a>
        </div>
    )
}