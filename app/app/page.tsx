"use client"
import SideBar from "@/app/component/SideBar";
import Post from "@/app/component/Post/Post";


export default function Home() {
  return (
    <div>
      <div className=" bg-black flex flex-row">
      <SideBar />
      <Post/>
    </div>
    </div>
    
  );
}
