
import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "@/data/verification-token";
import {db} from "@/lib/db"
export const generateVerificationToken = async (email) => {
        const token = uuidv4();
        console.log(token);
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