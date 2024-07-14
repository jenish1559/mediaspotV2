"use server"
import bycrypt from "bcryptjs"
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const settings = async (values) => {

    const user = await currentUser();
    if(!user){
        return  {error : "Unauthorized"} 
    }
    const dbUser = await getUserById(user.id);

    if(!dbUser){
        return {error : "Unauthorized"}
    }

    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email);
        if(existingUser && existingUser.id !== user.id){
            return { error : "Email already in use!"}
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(verificationToken.email,verificationToken.token);

        return {success : "Verification email send!"}
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch = await  bycrypt.compare(values.password,dbUser.password);
        if(!passwordMatch){
            return {error : " Incorrect password!"}
        }

        const hasedPassword = await bycrypt.hash(values.password,10);
        values.password = hasedPassword;
        values.newPassword = undefined;

    }

    const updatedUser = await db.user.update({
        where : {id : user.id},
        data: {...values}
    })
  
    return {success : "Settings Updated!"}
}