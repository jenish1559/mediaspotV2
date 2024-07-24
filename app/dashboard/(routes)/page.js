"use client"
import React, { useEffect } from 'react'

import { useStoreModal } from '@/hooks/use-store-modal'

const DashboardPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen){
      onOpen();
    };
  },[isOpen, onOpen]);

  return null;
}

export default DashboardPage;
