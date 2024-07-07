
import {db} from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
export const generateVerificationToken = async (email) => {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        const existingToken = await getVerificationTokenByEmail(email);

        if(existingToken){
            await db.VerificationToken.delete({
                where : {id : existingToken.id}
            })
        }

        const verificationToken = await db.verificationToken.create({
            data : {
                email,
                token,
                expires
            }
        });

        return verificationToken;
}

export const generatePasswordResetToken = async (email) => {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        const existingToken = await getPasswordResetTokenByEmail(email);

        if(existingToken){
            await db.passwordResetToken.delete({
                where : {id : existingToken.id}
            })
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data : {
                email,
                token,
                expires
            }
        });

        return passwordResetToken;
}