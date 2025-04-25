"use client"

import { Images } from "@/app/Type/PostType"
import CircularProgress from "@mui/material/CircularProgress"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function PostBoxImage({ Images, setImagesUrl }: { Images: Images[], setImagesUrl: Dispatch<SetStateAction<Images[]>> }) {
    const [uploadProgress, setUploadProgress] = useState<{ [key: number]: number }>({})

    useEffect(() => {
        const notUploaded = Images.filter(img => !img.uploaded);
        if (notUploaded.length === 0) return;

        const uploadImages = async () => {
            const token = localStorage.getItem("token")

            const updatedImages = await Promise.all(
                Images.map(async (img, index) => {
                    if (img.uploaded) return img
                    const formData = new FormData()
                    formData.append("image", img.file)
                    return new Promise<Images>((resolve) => {
                        const xhr = new XMLHttpRequest()
                        xhr.open("POST", `${process.env.NEXT_PUBLIC_API_URL}/auth/imgupload`)
                        xhr.upload.onprogress = (e) => {
                            if (e.lengthComputable) {
                                const percent = Math.round((e.loaded / e.total) * 100)
                                setUploadProgress(prev => ({ ...prev, [index]: percent }))
                            }
                        }
                        xhr.onload = () => {
                            if (xhr.status === 200) {
                                const result = JSON.parse(xhr.responseText)
                                resolve({
                                    ...img,
                                    url: result.url || "",
                                    uploaded: true,
                                })
                            } else {
                                alert(`Upload failed for ${img.file.name}`)
                                resolve(img)
                            }
                        }
                        xhr.onerror = () => {
                            alert(`Upload error for ${img.file.name}`)
                            resolve(img)
                        }
                        xhr.setRequestHeader("Authorization", `Bearer ${token}`)
                        xhr.send(formData)
                    })
                })
            )
            if (JSON.stringify(updatedImages) !== JSON.stringify(Images)) {
                setImagesUrl(updatedImages);
            }

        }

        if (Images.length > 0) {
            uploadImages()
        }
    }, [Images,setImagesUrl])
    return (
        <div className=" flex  gap-2">
            {Images.map((src, index) => (
                <div key={index} className=" w-[100px] h-[100px] ">
                    {uploadProgress[index] < 100 && <CircularProgress variant="determinate" sx={{ position: "absolute" }} value={uploadProgress[index]} />}
                    <Image
                        src={src.path}
                        alt={`Pasted ${index}`}
                        className="border rounded w-full h-full"
                    />

                </div>
            ))}
            <button className=" w-[100px] h-[100px] hover:bg-red-900 border rounded">
                +
            </button>

        </div>

    )
}