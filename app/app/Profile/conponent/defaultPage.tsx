
export default function DefaultPage({ children }: { children: React.ReactNode }) {

    return (
        <div className="md:w-2/3 right-0 md:fixed flex p-3 flex-col h-full overflow-auto ">
            {children}
        </div>
    )
}