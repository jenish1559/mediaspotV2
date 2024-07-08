"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader} from "react-spinners"
import { useCallback, useState } from "react"
import { NewVerification } from "@/app/auth/new-verification/page"
export const NewVerificationForm = () => {
const [error, setError] = useState();
const [success, setSuccess] = useState();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {

        if(!token){
            setError("Missing token!");
            return;
        }
        NewVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        console.log(token);
    },[token])


    return(
        <div>
            <CardWrapper headerLabel="Confirming your verification"
                         backButtonLabel="Back to login"
                         backButtonhref="/auth/login">
                        <div className="flex items-center w-full justify-center">
                            <BeatLoader/>
                        </div>

            </CardWrapper> 
        </div>
    )
}