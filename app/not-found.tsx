import Link from 'next/link'

export default function NotFound() {
  return (
      <div className=' w-screen h-screen flex flex-col items-center justify-center text-3xl gap-2'>
      <h2 className=' text-5xl'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className=' underline'>Return Home</Link>
    </div>
  )
}
