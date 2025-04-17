import { JSX } from "react"

enum Access {
    Public = "public",
    Follow = "follow",
}
enum Post{
    Daily = "daily",
    Store = "store",
}
type TypeSelectPost = {
    value: string
    label: string 
    icon?: JSX.Element
}

type TypePostView = {
    Name: string;
    Avatar: string;
    TypeofAccess: string;
    TypeofPost: string;
    message: string
    date: number;
}

export type { TypeSelectPost, TypePostView, }
export {Post,Access}
