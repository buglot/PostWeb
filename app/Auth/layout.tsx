

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div className="bg-blue-400 w-screen h-screen">
            {children}
        </div>
    );
}