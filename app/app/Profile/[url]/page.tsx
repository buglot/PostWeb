"use client"
import { useContext, useEffect, useState } from 'react'
import ProfileView from '../conponent/Profileside';
import { GetProfile } from '@/app/Type/ProfileType';
import { ErrorType } from '@/app/Type/Error';
import { NotifyContext } from '@/app/Type/notify';
import { useParams, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
export default function PageProfile() {
    const {url} = useParams<{url:string}>();
    const [data, setData] = useState<GetProfile>();
    const noti = useContext(NotifyContext)
    const searchParams = useSearchParams()
    const search = searchParams.get('page')
    console.log(search);
    useEffect(() => {
        const getdataprofile = async () => {
            try {
                const data = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/ProfileUrl?url=" + url, {
                    headers: {
                        Authorization:"Bearer "+ localStorage.getItem("token")
                    }
                })
                const status =await data.status
                if (status == 200) {
                    
                } else {
                    const respones:ErrorType = await data.json()
                    throw new Error( respones.message)
                }
            } catch (error: any) {
                noti.setNotify(true);
                noti.setMsgError(error.message)
            }
        }
        getdataprofile();
    }, [])
    return (
        <div className=" flex ">
            <ProfileView />
        </div>);
}