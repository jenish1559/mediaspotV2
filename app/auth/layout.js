import React from 'react'

export const AuthLayout = ({children}) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-200 ">
        {children}
    </div>
  )
}

export default AuthLayout;
