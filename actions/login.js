"use server"
import { LoginSchema } from '@/schemas'
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { getTwofactorTokenByEmail } from '@/data/two-factor-token';
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values) => {
  const validatedField = LoginSchema.safeParse(values);
    if(!validatedField.success)
        return { error : "Invalid fields!"};

    const { email, password, code } = validatedField.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
      return { error : "Email does nor exist!"}
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {success: "Confirmation email sent!"};
    };

    if(existingUser.isTwoFactorEnabled && existingUser.email){
      if(code){
        const twoFactorToken = await getTwofactorTokenByEmail(existingUser.email);

        if(!twoFactorToken){
          return {error: "Invalid code!" };
        }

        if(twoFactorToken.token !== code){
          return {error : "Invalid code!"};
        }
       
        const hasExpires = new Date(twoFactorToken.expires) < new Date();

        if(hasExpires){
          return { error : "Code expired!"};

        }
        await db.twoFactorToken.delete({
          where : {id: twoFactorToken.id }
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if(existingConfirmation){
          await db.twoFactorConfirmation.delete({
            where : {id: existingConfirmation.id},
          });
        }

        await db.twoFactorConfirmation.create({
          data : {
            userId : existingUser.id,

          }
        })
        //TODO: Verify Code
      }
      else{
        
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(twoFactorToken.email,twoFactorToken.token);
        return { twoFactor: true};
      }
    }
    

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
