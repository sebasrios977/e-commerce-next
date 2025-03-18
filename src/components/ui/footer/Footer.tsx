import { titleFont } from '@/config/fonts'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
        <Link
          href="/"
          className='mx-3'
        >
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
        <span>| shop </span>
        <span>&copy; {new Date().getFullYear()} </span>
        </Link>

        <Link
          href="/"
          className='mx-3'
        >
            Privacidad & Legal 
        </Link>

        <Link
          href="/"
          className='mx-3'
        >
            Ubicaciones
        </Link>
    </div>
  )
}

export default Footer
