import React from 'react'

export const DashboardLayout = ({children}) => {
  return (
    <div className="flex flex-col gap-y-4">
        <nav className="bg-blue-500">
            Shared Nav Bar for Dashboard.
        </nav>

       {children}
    </div>
  )
}

export default DashboardLayout;
