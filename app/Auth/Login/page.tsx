"use client";

import { TextField } from "@mui/material";
import { useRef } from "react";
type LoginType = {
    Username: string | undefined;
    Password: string | undefined;
    Email: string | undefined;
};
export default function LoginPage() {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    async function submitLogin() {
        const data: LoginType = { Username: username.current!.value, Password: password.current!.value, Email: username.current!.value }
        console.log(JSON.stringify( data ));
        const reponse = await fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify( data )
        })
        const datajson = await reponse.json()
        console.log(datajson);
    }
    return (
        <div className="flex flex-row w-full h-full">
            <div className="text-5xl md:text-7xl xl:text-9xl text-black font-bold flex w-1/2 justify-center items-center h-full bg-blue-800">
                Login
            </div>
            {/* formlogin */}
            <div className="w-1/2 h-full justify-center items-center flex flex-col">
                <form className="flex flex-col w-3/4 xl:w-1/2 bg-blue-700 p-3 rounded-3xl gap-2" onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
                    <label className=" text-3xl text-center font-bold">Login</label>
                    <TextField inputRef={username} color="primary" id="outlined-basic" label="Username or Email" variant="outlined" required/>
                    <TextField inputRef={password} color="primary" id="outlined-basic" label="Password" type="password" variant="outlined" required />
                    <div className=" flex w-full justify-center">
                        <button type="submit" className="w-[70px] h-[50px] bg-blue-400 text-black font-bold rounded-md">Login</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}