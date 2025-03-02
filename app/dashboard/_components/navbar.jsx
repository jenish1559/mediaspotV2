import { UserButton } from '@/components/auth/user-button'
import React from 'react'
import MainNav from '@/app/dashboard/_components/main-nav'
import StoreSwitcher from '@/app/dashboard/_components/store-switcher'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ThemeToggle } from '@/components/theme-toggle'

const Navbar = async () => {
  const user = await auth();
  if(!user){
    redirect("/auth/login")
  }
  const userId = user?.id;

  const stores = await db.store.findMany({
    where : {
      userId
    }
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle/>
          <UserButton />
        </div>
      </div>

    </div>
  )
}

export default Navbar