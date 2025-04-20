"use client"

export default function Lock({ show, children }: { show: boolean, children: React.ReactNode; }) {
    if (show == false) {
        return null
    }
    return (
        <div className=" absolute scroll-auto left-0 top-0 bg-black bg-opacity-50 w-full h-full z-50 bottom-0">
            {children}
        </div>
    )
}