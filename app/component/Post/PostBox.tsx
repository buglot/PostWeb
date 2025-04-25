import { Button, FormControl,  Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import { DataOfAccess, DataOfPost } from "@/app/Type/DataPost";
import { CreatePostInput, Images } from "../../Type/PostType";
import { useEffect, useRef, useState } from "react";
import PostBoxImage from "./PostBoxImage";

export default function PostBox() {
    const [Images, setImagesUrl] = useState<Images[]>([]);
    const access = useRef<HTMLInputElement>(null);
    const typepost = useRef<HTMLInputElement>(null);
    const message = useRef<HTMLInputElement>(null);
    const MAX_IMAGES = 5;
    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;
            if (!items) return;
            if (items[0].type.indexOf('image') === 0) {
                const file = items[0].getAsFile();
                if (file) {
                    const url = URL.createObjectURL(file);
                    setImagesUrl(prev => {
                        if (prev.length >= MAX_IMAGES) {
                            alert('You can only paste up to 5 images.');
                            return prev;
                        }
                        const combined = [...prev, { file: file, path: url, url: "", uploaded: false }];
                        if (combined.length > MAX_IMAGES) {
                            alert('You can only paste up to 5 images.');
                            return combined.slice(0, MAX_IMAGES);
                        }
                        return combined;
                    });
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, [])
    
    async function Submit() {
        const token = localStorage.getItem("token")
        const post: CreatePostInput = {
            Message: message.current!.value,
            Accessname: access.current!.value,
            TypeofPostname: typepost.current!.value
        }
        if (Images.length > 0) {
            const urls: string[] = Images.map(img => img.url);
            post.Images = urls
        }
        console.log(JSON.stringify(post))
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/Post", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(post)
        });
        const status = await response.status
        const data = await response.json()
        if (status == 201) {
            window.location.reload()
        } else {
            console.log(data.messeage);
            
        }
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); Submit(); }} className=" w-full md:w-1/2 p-2 rounded-md gap-3 flex flex-col">
            <div className=" flex justify-between">
                <a className=" text-xl">Post</a>
                <div className=" flex gap-4">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <Select
                            inputRef={access}
                            id="filled-basic"
                            defaultValue="public"
                        >
                            {DataOfAccess.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.icon} {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <Select
                            inputRef={typepost}
                            id="filled-basic"
                            defaultValue="daily"
                        >
                            {DataOfPost.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.icon}{option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <TextField
                inputRef={message}
                id="filled-textarea"
                placeholder="Let's post!"
                multiline
                variant="filled"
                autoFocus={true}
                sx={{ width: "100%", height: "100%" }}
                maxRows={9}
                minRows={7}
            ></TextField>
            <PostBoxImage Images={Images} setImagesUrl={setImagesUrl} />
            <Button type="submit" variant="contained" endIcon={<SendIcon color="secondary" />}>
                Send
            </Button>
        </form>
    )
}