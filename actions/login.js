"use server"
import { LoginSchema } from '@/schemas'
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values) => {
  const validatedField = LoginSchema.safeParse(values);
    if(!validatedField.success)
        return { error : "Invalid fields!"};

    const { email, password } = validatedField.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
      return { error : "Email does nor exist!"}
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {success: "Confirmation email sent!"};
    };


    try{
        await signIn("credentials",{
          email,
          password,
          redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    catch(error){
      if(error instanceof AuthError){
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
