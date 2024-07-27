
import { auth } from '@/auth';
import { db } from '@/lib/db';
import React from 'react'
import SettingsForm from './components/settings-form';

const SettingsPage = async ({params}) => {

  const user = await auth();
  const userId = user.id;
  console.log("ID:", user)

  if (!user) {
    redirect('/auth/login');
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeid,
      userId
    }
  });

  if (!store) {
    redirect('/dashboard');
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">

       <SettingsForm   />
      </div>
    </div>
  )
}

export default SettingsPage;
