// app/find/FindClient.tsx
"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import BoxViewProfile from "./boxViewProfile"
import { User } from "@/app/Type/User"

export default function FindClient() {
    const [data, setData] = useState<User[]>([])
    const [msg, setMsg] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const searchParams = useSearchParams()
    const search = searchParams.get('name')
 

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?name=${search}`)
            if (response.status === 200) {
                const json: User[] = await response.json()
                setData(json)
            } else if (response.status === 204) {
                const json = await response.json()
                setMsg(json.message)
            }
            setLoading(false)
        }
        getData()
    }, [search])

    if (loading) return
    <div className="p-2">
        Search: {search}
        <p>Loading...</p>
    </div>

    return (
        <div className="p-2">
            Search: {search}
            <div>{msg}</div>
            <div className="flex flex-wrap gap-2">
                {data.map((v, i) => <BoxViewProfile key={i} props={v} />)}
            </div>
        </div>
    )
}
