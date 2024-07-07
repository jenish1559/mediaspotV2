"use server"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/token"

export const reset = async (values) => {
    const validatedFields =   ResetSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalid email!"};
    }

    const {email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return { error :"Email not found!"}
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token);
    return {success : "Reset email sent"}
}    