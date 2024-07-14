"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "../ui/form"
import { CardWrapper } from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { NewPasswordSchema } from '@/schemas/index'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { newPassword } from '@/actions/new-password'
import { useSearchParams } from 'next/navigation'

export const NewPasswordForm = () => {
const searchParams = useSearchParams();
const token = searchParams.get("token");

  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [isPending, startTransition ] = useTransition();
  const form = useForm({
    resolver : zodResolver(NewPasswordSchema),
    defaultValues :{
      password : "",
    },
  });

  const onSubmit = (values) =>{

    startTransition (() => {
      newPassword(values,token).then((data) => {
           
            setError(data?.error);
            setSuccess(data?.success);
      });
    })
    
  }
  return (
    <CardWrapper headerLabel="Enter a new password" backButtonLabel="Back to login" backButtonhref={"/auth/login"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
   
  )
}
