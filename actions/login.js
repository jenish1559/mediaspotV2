"use server"
import { LoginSchema } from '@/schemas'

export const login = async (values) => {
  const validatedField = LoginSchema.safeParse(values);
    if(!validatedField.success)
        return { error : "Invalid fields!"};

    return { success : "You are logged in.!"}
}
