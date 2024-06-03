import React from 'react';
import NavigationbarBuyers from '@/components/buyers/navigationbar.buyers';
import { signOut } from 'next-auth/react';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>

      <NavigationbarBuyers signOut={signOut} />
      <div className='flex-1'>
        {children}
      </div>

    </div>
  );
}
