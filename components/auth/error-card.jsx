import React from 'react'
import { CardWrapper } from './card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="Oops! something went wrong!"
                 backButtonLabel="back to login!" 
                 backButtonhref="/auth/login">
        <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive"/>
        </div>            
        
    </CardWrapper>
  )
}
