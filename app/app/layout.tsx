
import MenuNav from "../component/Menubar";
export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <MenuNav />
            {children}
        </>
    )
}