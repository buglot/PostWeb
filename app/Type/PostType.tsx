import { JSX } from "react"

enum Access {
    Public = "public",
    Follow = "follow",
}
enum Post {
    Daily = "daily",
    Shop = "shop",
}
type TypeSelectPost = {
    value: string
    label: string
    icon?: JSX.Element
}

type TypePostView = {
    Name: string;
    UserUrl: string;
    Url:string
    Avatar: string;
    TypeofAccess: string;
    TypeofPost: string;
    Message: string
    Date: number;
    Images?: string[]
    message?: string
    IsMyPost: boolean
    IntLike: number
    Liked:boolean
}
type CreatePostInput = {
    Message: string
    Accessname: string
    TypeofPostname: string
    Images?: string[]
}
type Images = {
    file: File;
    path: string;
    url: string;
    uploaded: boolean;
}
export type { TypeSelectPost, TypePostView, Images ,CreatePostInput}
export { Post, Access }
