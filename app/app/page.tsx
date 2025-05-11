"use client"
import SideBar from "@/app/component/SideBar";
import Post from "@/app/component/Post/Post";
import Friendside from "../component/friend/friend";


export default function Home() {
  return (
    <div>
      <div className=" bg-black flex flex-row">
      <SideBar />
        <Post />
        <Friendside />
    </div>
    </div>
    
  );
}
