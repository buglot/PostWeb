"use client";

import { TextField } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";


type registerType = {
    Username: string | undefined;
    Password: string | undefined;
    Email: string | undefined;

};

export default function Registerpage() {
    const username = useRef<HTMLInputElement>(null);
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [rePasswordValue, setRePasswordValue] = useState<string>('');
    const Email = useRef<HTMLInputElement>(null);
    const [check, setCheck] = useState<boolean>(false);
    async function submitRegister() {
        
        
        const data: registerType = { Username: username.current!.value, Password: passwordValue, Email: Email.current!.value }
        console.log(JSON.stringify( data ));
        const reponse = await fetch("http://localhost:8080/register", {
            method: "POST",
            body: JSON.stringify( data )
        })
        const datajson = await reponse.json()
        console.log(datajson);
        
    }
    useEffect(() => {
        if (rePasswordValue && passwordValue && rePasswordValue !== passwordValue) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      }, [rePasswordValue, passwordValue]);
    return (
        <div className="flex flex-row w-full h-full">

            {/* formlogin */}
            <div className="w-1/2 h-full justify-center items-center flex flex-col">
                <form className="flex flex-col w-3/4 xl:w-1/2 bg-blue-700 p-3 rounded-3xl gap-2" onSubmit={(e) => { e.preventDefault(); submitRegister(); }}>
                    <label className=" text-3xl text-center font-bold">Register</label>
                    <TextField inputRef={username} color="primary" id="outlined-basic" label="Username or Email" variant="outlined" required />
                    <TextField inputRef={Email} color="primary" id="outlined-basic" label="Email" type="email" variant="outlined" required />
                    <TextField onChange={
                        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPasswordValue(e.target.value)
                    } color="primary" id="outlined-basic" label="Password" type="password" variant="outlined" required />
                    <TextField onChange={
                        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setRePasswordValue(e.target.value)
                    }
                        color="primary" id="outlined-basic" label="Re-Password" type="password" variant="outlined" required />
                    <div className=" flex w-full justify-center"></div>
                    <div className=" flex w-full justify-center">
                        <button type="submit" disabled={check} className="w-[70px] h-[50px] bg-blue-400 text-black font-bold rounded-md">Register</button>
                    </div>
                    {check?<div className=" text-red-700 text-2xl">Password dont match</div>:""}
                </form>
            </div>
            <div className="text-5xl md:text-7xl xl:text-9xl text-black font-bold flex w-1/2 justify-center items-center h-full bg-blue-800">
                Register
            </div>
        </div>
    )
}