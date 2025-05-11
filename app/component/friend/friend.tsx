
import BoxFriend from "./boxfriend";
import { useEffect, useState } from "react";
import useWebSocket from "@/app/websocket/websocket";
import { friend } from "@/app/Type/friend";

export default function Friendside() {
    const [dataFriend, setFriend] = useState<friend[]>([])
    useEffect(() => {
        const getFriend = async () => {
            const response = fetch(process.env.NEXT_PUBLIC_FRIEND_URL + "", {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token")
                }
            })
            const status = (await response).status;
            console.log("test01010");

            if (status == 200) {
                const data: friend[] = await (await response).json()
                setFriend(data)
            }
        }
        getFriend();
    }, []);
    const handleMessage = (message: string) => {
        console.log(message);
    };
    useWebSocket(handleMessage);
    
    return (
        <div className="flex w-1/6 h-screen flex-col">
            <div className=" w-full ">
                <a>Online</a>
                <div>
                    {dataFriend?.filter((v) => v.online).length > 0 ? (
                        dataFriend.filter((v) => v.online).map((v,i) => (
                            <BoxFriend key={i} props={v} online={v.online} />
                        ))
                    ) : (

                        <p>No friends online.</p>)}

                </div>
            </div>
            <div>
                <a>Offline</a>
                <div>
                {dataFriend?.filter((v) => v.online== false).length > 0 ? (
                        dataFriend.filter((v) => v.online==false).map((v,i) => (
                            <BoxFriend key={i} props={v} online={v.online} />
                        ))
                    ) : ""}
                </div>
            </div>
        </div>
    )
}