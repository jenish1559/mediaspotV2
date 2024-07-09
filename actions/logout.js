"use server"
import { signOut } from "@/auth"

export const logout = async () =>{
    //if some server stuff implemetation
    await signOut();
}