import { Button, FormControl, Paper, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import { DataOfAccess, DataOfPost } from "@/app/Type/DataPost";
import { CreatePostInput, Images, TypePostView } from "../../Type/PostType";
import { useEffect, useRef, useState } from "react";
import PostBoxImage from "./PostBoxImage";

export default function PostBox() {
    const [Images, setImagesUrl] = useState<Images[]>([]);
    const access = useRef<React.JSX.Element>(null);
    const typepost = useRef<React.JSX.Element>(null);
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
    useEffect(() => {
        const uploadImages = async () => {
            const updatedImages = await Promise.all(
                Images.map(async (img) => {
                    if (img.uploaded) return img;
                    const formData = new FormData();
                    formData.append("image", img.file);
                    try {
                        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/imgupload", {
                            method: "POST",
                            body: formData,
                        });
                        if (!response.ok) {
                            throw new Error("Failed to upload image");
                        }
                        const result = await response.json();
                        return { ...img, url: result.url, uploaded: true };
                    } catch (error) {
                        alert("Upload failed: " + (error as Error).message);
                        return img;
                    }
                })
            );
            setImagesUrl(updatedImages);
        };
        if (Images.length > 0) {
            uploadImages();
        }
    }, [Images])
    async function Submit() {
        const token = localStorage.getItem("token")
        const post: CreatePostInput = {
            
        }
        const response = fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
            method: "POST",
            headers: {
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({})
        })
    }
    return (
        <div className=" w-full md:w-1/2 p-2 rounded-md gap-3 flex flex-col">
            <div className=" flex justify-between">
                <a className=" text-xl">Post</a>
                <div className=" flex gap-4">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <Select
                            ref={typepost}
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
                            ref={access}
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
            <Button variant="contained" endIcon={<SendIcon color="secondary" />}>
                Send
            </Button>
        </div>
    )
}