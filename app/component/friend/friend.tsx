import { User } from "@/app/Type/User";
import BoxFriend from "./boxfriend";
import { useEffect, useRef, useState } from "react";
import useWebSocket from "@/app/websocket/websocket";

export default function Friendside() {
    const [token, setToken] = useState<string | null>(null);
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);
    const handleMessage = (message: string) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
        console.log(message);
    };
    const { sendMessage } = useWebSocket(localStorage.getItem("token"),handleMessage);
    return (
        <div className="flex w-1/6 h-screen flex-col">
            <div className=" w-full ">
                <a>Online</a>
                <div>


                </div>
            </div>
            <div>
                <a>Offline</a>
                <div>

                </div>
            </div>
        </div>
    )
}