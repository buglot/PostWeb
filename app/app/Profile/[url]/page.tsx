"use client"
import { useContext, useEffect, useState } from 'react'
import ProfileView from '../conponent/Profileside';
import { GetProfile, GetProfileContext } from '@/app/Type/ProfileType';
import { ErrorType } from '@/app/Type/Error';
import { NotifyContext } from '@/app/Type/notify';
import { useParams, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import ProfilePost from '../conponent/ProfilePost';
import DefaultPage from '../conponent/defaultPage';
import ProfileImage from '../conponent/img/ProfileImage';
export default function PageProfile() {
    const { url } = useParams<{ url: string }>();
    const [data, setData] = useState<GetProfile>({ Username: "", Follow: 0, Following: 0, Followed: false, Email: "", Url: "", Avatar: "", IsMyProfile: false });
    const noti = useContext(NotifyContext)
    const searchParams = useSearchParams()
    const search = searchParams.get('page')
    useEffect(() => {
        const getdataprofile = async () => {
            try {
                const data = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/ProfileUrl?url=" + url, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                const status = await data.status

                if (status == 200) {
                    const respones: GetProfile = await data.json()
                    setData(respones)
                } else {
                    const respones: ErrorType = await data.json()
                    throw new Error(respones.message)
                }
            } catch (error: any) {
                noti.setNotify(true);
                noti.setMsgError(error.message)
            }
        }
        getdataprofile();
    }, [])
    return (
        <GetProfileContext.Provider value={data}>
            <div className=" flex flex-col md:flex-row">
                <ProfileView />
                <DefaultPage>
                    {search == null || search == "post" ?
                        <ProfilePost /> : ""
                    }
                    {search == "images" ?
                        <ProfileImage /> : ""
                    }
                </DefaultPage>

            </div>
        </GetProfileContext.Provider>
    );
}