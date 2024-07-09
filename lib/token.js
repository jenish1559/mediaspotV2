import crypto from "crypto"
import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwofactorTokenByEmail } from "@/data/two-factor-token";


export const generateTwoFactorToken = async (email) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    //TODO: Later changes to 15 mintes.
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwofactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return twoFactorToken;
}

export const generateVerificationToken = async (email) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.VerificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
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

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}