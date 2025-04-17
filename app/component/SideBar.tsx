export default function SideBar(){
    return (
        <div className=" hidden md:w-1/6 bg-black md:flex flex-col sideber p-3">
            <a className=" text-[17px] flex gap-5  rounded-md hover:bg-red-950">
                <img src="https://static.thairath.co.th/media/NjpUs24nCQKx5e1BbC9ZSNanHbhwMLaM9WfjHYHpD9D.jpg" className="p-2 rounded-[100%] w-[60px] h-[60px] object-fill"></img>
                สมใจ สมหมาย
            </a>
            <a className="flex">Desboard</a>
        </div>
    )
}