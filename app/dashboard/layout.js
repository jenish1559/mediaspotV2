import React from 'react'
import { ModalProvider } from '@/providers/modal-providers';

export const DashboardLayout = ({children}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <ModalProvider/>
       {children}
    </div>
  )
}

export default DashboardLayout;
