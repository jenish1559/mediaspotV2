import { db } from "@/lib/db"


export const getUserByEmail = async (email) => {
    try{
        console.log(email);
        const user = await db.user.findUnique({where : {email}});
        console.log(JSON.stringify(user));
        return user;

    } catch{
        return null;
    }
};


export const getUserById = async (id) => {
    try{
        const user = await db.user.findUnique({where : {id}});
        return user;
    } catch{
        return null;
    }
};
