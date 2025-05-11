"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 
  useEffect(() => {
    const check = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/getPost`, {
        headers: {
          "Authorization": `Bearer ${window.window.localStorage.getItem('token')}`,
        }
      })
      const status = await data.status
      if (status != 200) {
        
        nav.push("/Auth/Login", { scroll: false })
      } else {
        nav.push("/app", { scroll: false })
      }
      return
    }
    check()
  }, [])
  const nav = useRouter();
  return;
}
