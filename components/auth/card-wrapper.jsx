"use client"
import React from 'react'
import { Card, CardContent,CardFooter,CardHeader } from '../ui/card'
import { Header } from './header'
import { Social } from './social'


export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonhref,
  showSocial
}) => {
  return (
   <Card className="w-[400px] shadow-md">
    <CardHeader>
        <Header label={headerLabel}/>
    </CardHeader>
    <CardContent>
    {children}
    </CardContent>
    {showSocial && (
        <CardFooter>
            <Social/>
        </CardFooter>
    )}
   </Card>
  )
}
