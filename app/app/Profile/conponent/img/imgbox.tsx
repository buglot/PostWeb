import Link from "next/link";

export default function ImgBox({url}:{url :string}) {
    return (
        <Link href="a" className=" w-[200px]">
            <img src={url} className=" hover:opacity-30"></img>
        </Link>
    )
}