import { createContext } from "react";

type GetProfile = {
    Username: string;
    Email: string;
    Url: string;
    Avatar: string;
    IsMyProfile: boolean;
    Followed: boolean;
    Follow: number;
    Following: number;
}

export const GetProfileContext = createContext<GetProfile>({Follow:0,Followed:false,Following:0,Username:"",Email:"",Url:"",Avatar:"",IsMyProfile:false})
export type {GetProfile}