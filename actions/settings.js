"use server"

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const settings = async (values) => {

    const user = await currentUser();
    if(!user){
        return  {error : "Unauthorized"} 
    }
    const dbUser = await getUserById(user.id);

    if(!dbUser){
        return {error : "Unauthorized"}
    }

    await db.user.update({
        where : {id : user.id},
        data: {...values}
    })

    return {success : "Settings Updated!"}
}