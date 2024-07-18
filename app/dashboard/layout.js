import React from 'react'

export const DashboardLayout = ({children}) => {
  return (
    <div className="flex flex-col gap-y-4">
       {children}
    </div>
  )
}

export default DashboardLayout;
