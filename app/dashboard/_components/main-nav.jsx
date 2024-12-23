"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'



function MainNav({ className }) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params.storeid}`,
      label: "Overview",
      active: pathname == `/dashboard/${params.storeid}`
    },
    {
      href: `/dashboard/${params.storeid}/billboards`,
      label: "Billboards",
      active: pathname == `/dashboard/${params.storeid}/billboards`
    },
    {
      href: `/dashboard/${params.storeid}/categories`,
      label: "Category",
      active: pathname == `/dashboard/${params.storeid}/categories`
    },
    {
      href: `/dashboard/${params.storeid}/sizes`,
      label: "Size",
      active: pathname == `/dashboard/${params.storeid}/sizes`
    },
    {
      href: `/dashboard/${params.storeid}/colors`,
      label: "Colors",
      active: pathname == `/dashboard/${params.storeid}/colors`
    },
    {
      href: `/dashboard/${params.storeid}/products`,
      label: "Products",
      active: pathname == `/dashboard/${params.storeid}/products`
    },
    {
      href: `/dashboard/${params.storeid}/orders`,
      label: "Orders",
      active: pathname == `/dashboard/${params.storeid}/orders`
    },
    {
      href: `/dashboard/${params.storeid}/settings`,
      label: "Settings",
      active: pathname == `/dashboard/${params.storeid}/settings`
    }
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link key={route.href}
          href={route.href}
          className={cn("tex-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )} >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav