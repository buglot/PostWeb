"use client";

import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
type LoginType = {
    Username: string | undefined;
    Password: string | undefined;
    Email: string | undefined;
};
export default function LoginPage() {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const nav = useRouter()
    async function submitLogin() {
        const data: LoginType = { Username: username.current!.value, Password: password.current!.value, Email: username.current!.value }
        const reponse = await fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify( data )
        })
        const datajson = await reponse.json()
        const status = await reponse.status
        if (status == 200) {
            localStorage.setItem("token",datajson.token)
            nav.push("/app",{scroll:true})
        } else {
            alert(datajson.message)
        }
    }
    return (
        <div className="flex flex-row w-full h-full">
            <div className="text-5xl md:text-7xl xl:text-9xl text-black font-bold flex w-1/2 justify-center items-center h-full bg-blue-800">
                Login
            </div>
            {/* formlogin */}
            <div className="w-1/2 h-full justify-center items-center flex flex-col gap-2">
                <form className="flex flex-col w-3/4 xl:w-1/2 bg-blue-700 p-3 rounded-3xl gap-2" onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
                    <label className=" text-3xl text-center font-bold">Login</label>
                    <TextField inputRef={username} color="primary" id="outlined-basic" label="Username or Email" variant="outlined" required/>
                    <TextField inputRef={password} color="primary" id="outlined-basic" label="Password" type="password" variant="outlined" required />
                    <div className=" flex w-full justify-center">
                        <button type="submit" className="w-[70px] h-[50px] bg-blue-400 text-black font-bold rounded-md">Login</button>
                    </div>
                </form>
                <Link href={"/Auth/Register"} className=" text-sm hover:underline">I don't have account</Link>
            </div>
            
        </div>
    );
}