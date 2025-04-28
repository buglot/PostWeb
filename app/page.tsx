"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 
  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem('token')
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/getPost`, {
        headers: {
          "Authorization": `Bearer ${token}`,
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
