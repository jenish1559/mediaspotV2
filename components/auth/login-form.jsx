"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CardWrapper } from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginSchema } from '@/schemas/index'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with diffrent provider!" : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      login(values).then((data) => {

        if (data?.error) {
          form.reset();
          setError(data?.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data?.success);
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      });
    })

  }
  return (
    <CardWrapper headerLabel={"welcome back"} backButtonLabel={"Don't have an account ?"} backButtonhref={"/auth/register"} showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField control={form.control} name="code" render={({ field }) =>
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="123456" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              } />
            )}
            {!showTwoFactor && (
              <>
                <FormField control={form.control} name="email" render={({ field }) =>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.deo@exmple.com"
                        type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                } />
                <FormField control={form.control} name="password" render={({ field }) =>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password" />
                    </FormControl>
                    <Button size="sm" className="px-0 font-normal" asChild variant="link">
                      <Link href="/auth/reset">
                        Forget password?
                      </Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                } />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            {showTwoFactor ?  "Confirm" : "Login" }
          </Button>
        </form>
      </Form>
    </CardWrapper>

  )
}
