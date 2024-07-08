"use server"
import bcryptjs from "bcryptjs"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db"

export const newPassword = async (values,token) => {
    if(!token){
        return { error : "Missing token!"}
    }
    const validatedFields = NewPasswordSchema.safeParse(values);

    if(!validatedFields){
        return {error : "Invalid fields!"};
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return {error : "Invalid token!"};
    }

    const hasExpires = new Date(existingToken.expires) < new Date();
    
    if(hasExpires){
        return {error : "TOken has expird!"};
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser){
        return { error : "Email does not exist!"}
    }

    const hasedPassword = await bcryptjs.hash(password,10);

    await db.User.update({
        where : {id : existingUser.id},
        data : {
            password : hasedPassword,
        }
    })

    await db.passwordResetToken.delete({
        where : { id: existingToken.id},
    });

    return {success : "Password updated."}

}