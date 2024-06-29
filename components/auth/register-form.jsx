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
import { RegisterSchema } from '@/schemas/index'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/register'

export const RegisterForm = () => {

  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [isPending, startTransition ] = useTransition();
  const form = useForm({
    resolver : zodResolver(RegisterSchema),
    defaultValues :{
      email : "",
      password: "",
      name : ""
    },
  });

  const onSubmit = (values) =>{
    startTransition (() => {
      register(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
      });
    })
    
  }
  return (
    <CardWrapper headerLabel={"Create an account"} backButtonLabel={"Already have an account ?"} backButtonhref={"/auth/login"} showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField  control={form.control} name="name" render={({field}) => 
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john doe"
                      type="text" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            } />
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
   
  )
}
