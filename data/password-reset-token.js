import {db} from "@/lib/db";

export const getPasswordResetTokenByToken = async (token) => {
    try{
        const passwordToken = await db.passwordResetToken.findunique({
            where : {token},
        })
        return passwordToken;
    }
    catch{
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email) => {
    try{
        const passwordToken = await db.passwordResetToken.findFirst({
            where : {email},
        })
        return passwordToken;
    }
    catch{
        return null;
    }
}