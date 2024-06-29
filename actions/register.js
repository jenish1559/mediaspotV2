"use server"
import bcrypt from "bcrypt"
import { RegisterSchema } from '@/schemas'
import { db }  from "@/lib/db"

export const register = async (values) => {
  const validatedField = RegisterSchema.safeParse(values);
  if(!validatedField.success){
    return { error : "Invalid fields!"};
  }
  const { email, password, name } = validatedField.data;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const existingUser = await db.user.findUnique({
    where : {
      email,
    }
  })

  if(existingUser){
    return { error : "Email already exist!"}
  }

  await db.user.create({
    data :{
      name,
      email,
      password:hashedPassword,
    },
  })

  // TODO: Send verification email
  return { success : "Register Successfully!"}
}
