import { db } from '@/lib/db';
import React from 'react'

export const DashboardPage1 = async ({storeId}) => {
  const store = await db.store.findFirst({
    where : {
      id: storeId,
    }
  });


  return (
    <div>
      Active Store: ${store.name};
    </div>
  )
}

export default DashboardPage1;
