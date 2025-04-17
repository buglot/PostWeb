import Image from "next/image";
import SideBar from "./component/SideBar";
import Post from "./component/Post/Post";

export default function Home() {
  return (
    <div className=" bg-black flex flex-row">
      <SideBar />
      <Post/>
    </div>
  );
}
