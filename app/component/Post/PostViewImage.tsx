"use client";

import { useEffect, useState } from "react";

export default function PostViewImage({ Images }: { Images: string[] }) {
   
    const [postImages, setPostImages] = useState<string[]>([])
    useEffect(() => {
        const loadImg = async () => {
            const image = await Promise.all(
                Images.map(async (value) => {
                    return new Promise<string>(async (resolve, reject) => {
                        const responese = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/img/"+value, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        const data = await responese.blob();
                        const status = await responese.status
                        if (status == 200) {
                            const url = URL.createObjectURL(data);
                            resolve(url)
                        } else {
                            reject("error")
                        }
                    }
                    )
                })
            )
            setPostImages(image)
        }
        loadImg()
    }, [])

    const [slideIndex, setSlideIndex] = useState(1);
    
    const plusDivs = (n: number) => {
        let newIndex = slideIndex + n;
        if (newIndex > Images.length) newIndex = 1;
        if (newIndex < 1) newIndex = Images.length;
        setSlideIndex(newIndex);
    };

    const currentDiv = (n: number) => {
        setSlideIndex(n);
    };
    return (
        <div className="flex relative flex-col w-full min-h-[600px] ">
            <div className=" flex w-full h-full">
                <div className="group/edit absolute flex p-3 h-full items-center w-[50px]" onClick={() => plusDivs(-1)}>
                    <button className="group-hover/edit:bg-gray-300 w-7 h-7 flex justify-center items-center text-black bg-white hover:bg-gray-300 active:bg-gray-400 rounded-[100%]">
                        &#10094;
                    </button>
                </div>
                <div className="group/edit absolute flex right-0  p-3 h-full items-center w-[50px]" onClick={() => plusDivs(1)}>
                    <button className="group-hover/edit:bg-gray-300 w-7 h-7 flex justify-center items-center text-black bg-white hover:bg-gray-200 active:bg-gray-400 rounded-[100%]">
                        &#10095;
                    </button>
                </div>
                {postImages.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Slide ${i + 1}`}
                        className="w-full h-full object-cover "
                        style={{ display: slideIndex === i + 1 ? 'block' : 'none' }}
                    />
                ))}
            </div>
            <div className="w-full absolute flex justify-center p-3 gap-1">
                {Images.map((_, i) => (
                    <button
                        key={i}
                        className={`${slideIndex === i + 1 ? 'bg-white w-2 h-2 rounded-[100%]' : 'bg-black w-2 h-2 rounded-[100%]'}`}
                        onClick={() => currentDiv(i + 1)}
                    ></button>
                ))}
            </div>
        </div>

    )
}