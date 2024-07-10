"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { usePathname } from "next/navigation"

export const  Navbar = () => {
    const pathName = usePathname;
    return(
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button asChild varient={ pathName === "/server" ? "default" : "outline"}>
                <Link href="/settings">Server</Link>
                </Button>
                <Button asChild varient={ pathName === "/settings" ? "default" : "outline"}>
                <Link href="/settings">Settings</Link>
                </Button>

            </div>
        </nav>
    )
    
}