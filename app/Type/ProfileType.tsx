import { createContext } from "react";

type GetProfile = {
    Username: string;
    Email: string;
    Url: string;
    Avatar: string;
    IsMyProfile: boolean;
}

export const GetProfileContext = createContext<GetProfile>({Username:"",Email:"",Url:"",Avatar:"",IsMyProfile:false})
export type {GetProfile}