"use client";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
export default function PostViewComment() {
    return (
        <div className=' flex justify-between h-[60px] w-full'>
            <a className=' p-3 hover:bg-red-400 flex justify-center items-center w-1/3 rounded-md'>
                <ThumbUpIcon />Like
            </a>
            <a className=' p-3 hover:bg-red-400 flex justify-center items-center w-1/3 rounded-md'>
                <CommentIcon/> Comment
            </a>
            <a className=' p-3 hover:bg-red-400 flex justify-center items-center w-1/3 rounded-md'>
                <ShareIcon/> Share
            </a>
            
        </div>
    )
}