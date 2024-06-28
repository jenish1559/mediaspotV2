import React from 'react'
import { CardWrapper } from './card-wrapper'

export const LoginForm = () => {
  return (
    <CardWrapper headerLabel={"welcome back"} backButtonLabel={"Don't have an account ?"} backButtonhref={"/auth/register"}>
     <div>login-form</div> 
    </CardWrapper>
   
  )
}
