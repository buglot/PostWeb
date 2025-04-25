"use client";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Post } from '@/app/Type/PostType';
export default function PostViewComment({ type }: { type: string }) {
    function checkTypePost() {
        return type == Post.Shop
    }
    return (
        <div className=' flex justify-between h-[60px] w-full'>
            <a className={` p-3 ${checkTypePost()?"hover:bg-red-400":"hover:bg-gray-400"} transition flex justify-center items-center w-1/3 rounded-md`}>
                <ThumbUpIcon />Like
            </a>
            <a className={` p-3 ${checkTypePost()?"hover:bg-red-400":"hover:bg-gray-400"} transition flex justify-center items-center w-1/3 rounded-md`}>
                <CommentIcon/> Comment
            </a>
            <a className={` p-3 ${checkTypePost()?"hover:bg-red-400":"hover:bg-gray-400"} transition flex justify-center items-center w-1/3 rounded-md`}>
                <ShareIcon/> Share
            </a>
            
        </div>
    )
}