"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "../ui/form"
import * as z from "zod"
import { CardWrapper } from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginSchema } from '@/schemas/index'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with diffrent provider!" : "";
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [isPending, startTransition ] = useTransition();
  const form = useForm({
    resolver : zodResolver(LoginSchema),
    defaultValues :{
      email : "",
      password: "",
    },
  });

  const onSubmit = (values) =>{
    startTransition (() => {
      login(values).then((data) => {
           
            setError(data?.error);
            //TODO: Add when implement 2FA
            setSuccess(data?.success);
      });
    })
    
  }
  return (
    <CardWrapper headerLabel={"welcome back"} backButtonLabel={"Don't have an account ?"} backButtonhref={"/auth/register"} showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField  control={form.control} name="email" render={({field}) => 
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.deo@exmple.com"
                      type="email" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            } />
             <FormField  control={form.control} name="password" render={({field}) => 
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            } />

          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
   
  )
}
