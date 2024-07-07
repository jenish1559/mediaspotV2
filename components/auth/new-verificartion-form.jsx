"use client"

import { useCallback,useEffect,useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { CardWrapper } from './card-wrapper'
import { newVerification } from '@/actions/new-verification'
import { FormError } from "@/components/form-error"
import { FormSuccess } from '@/components/form-success'


const NewVerificationForm = () => {
    const [error, setError] =   useState();
    const [success, setSuccess] = useState();

    const searchParams = useSearchParams();
    const token = searchParams.get("token"); 

    const onSubmit = useCallback(() => {
        if(success || error) return;
        
        if(!token) {
            setError("Missing token!")
            return;
        }
        newVerification(token).then((data)=>{
             setSuccess(data.success);
             setError(data.error);
        }).catch(() => {
            return { error : "Someting went wrong!"};
        })
    },[token,success, error]);

    useEffect(() => {
        onSubmit();
    },[onSubmit])

  return (
    <CardWrapper headerLabel="Confirming your  verification"
                 backButtonLabel="Back to login"
                 backButtonhref="/auth/login">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader/>
                )}
                <FormSuccess message={success}/>
                {!success && (
                    <FormError message={error}/>
                )}
            </div>
    </CardWrapper>  
  )
}

export default NewVerificationForm
