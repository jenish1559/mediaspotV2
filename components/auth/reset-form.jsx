"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "../ui/form"
import { CardWrapper } from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ResetSchema } from '@/schemas/index'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { reset } from '@/actions/reset'

export const ResetForm = () => {
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [isPending, startTransition ] = useTransition();
  const form = useForm({
    resolver : zodResolver(ResetSchema),
    defaultValues :{
      email : "",
    },
  });

  const onSubmit = (values) =>{

    console.log(values);
    startTransition (() => {
      reset(values).then((data) => {
           
            setError(data?.error);
            //TODO: Add when implement 2FA
            setSuccess(data?.success);
      });
    })
    
  }
  return (
    <CardWrapper headerLabel="Forgot your password?" backButtonLabel="Back to login" backButtonhref={"/auth/login"}>
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
                      placeholder="john.doe@exmple.com"
                      type="email" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            } />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
   
  )
}
