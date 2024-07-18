"use client"
import { Modal } from '@/components/ui/modal';
import React from 'react'

export const DashboardPage = () => {
  return (
    <div className="p-4">
      <Modal title="Test" description="Test Desc" isOpen onClose={() => {}}>
        dashboard page
      </Modal>
    </div>
  )
}

export default DashboardPage;
