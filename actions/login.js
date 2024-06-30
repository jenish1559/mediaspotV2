"use server"
import { LoginSchema } from '@/schemas'
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values) => {
  const validatedField = LoginSchema.safeParse(values);
    if(!validatedField.success)
        return { error : "Invalid fields!"};

    const { email, password } = validatedField.data;
    try{
        await signIn("credentials",{
          email,
          password,
          redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    catch(error){
      if(error instanceof AuthError){
        console.log("exceptoon ", error.type);
        switch(error.type){
          
          case "CredentialsSignin":
            return { error : "Invalid Credentials!"};
          default:
            return { error: "something went wrong!"}  
         
        }
      }
      throw error;
    }
}
