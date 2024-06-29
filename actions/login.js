"use server"
import { LoginSchema } from '@/schemas'
import React from 'react'
import * as z from "zod"

export const login = async (values) => {
  const validatedField = LoginSchema.safeParse(values);
    if(!validatedField.success)
        return { error : "Invalid fields!"};

    return { success : "Email sent!"}
}
