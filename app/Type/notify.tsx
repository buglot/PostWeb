import { createContext, Dispatch, SetStateAction} from "react";

type notifyType = {
    setNotify: Dispatch<SetStateAction<boolean>>
    setMsgError: Dispatch<SetStateAction<string>>
}
export const defaultNotifyType: notifyType = {
    setNotify: () => { },
    setMsgError: () => { },
};

export const NotifyContext = createContext<notifyType>(defaultNotifyType);
export type { notifyType }