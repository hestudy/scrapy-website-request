'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Home, LayoutList } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()
  return (
    <>
      {pathname !== '/home' && (
        <Link href={'/home'}>
          <Button variant={'outline'} size={'icon'}>
            <Home></Home>
          </Button>
        </Link>
      )}
      {!pathname.includes('urlList') && (
        <Link href={'/home/urlList/1'}>
          <Button variant={'outline'} size={'icon'}>
            <LayoutList></LayoutList>
          </Button>
        </Link>
      )}
    </>
  )
}

export default Nav
