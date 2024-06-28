"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export const LoginButton = ({children,mode = "redirect", asChild}) => {

    const router = useRouter();

    const onClick = () => { 
        router.push("/auth/login")
    }
    
    if(mode === "modal"){
        return(
            <span>ToDo: Implememt modal</span>
        )
    }
  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  )
}
