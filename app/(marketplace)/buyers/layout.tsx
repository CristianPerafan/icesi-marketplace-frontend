import React from 'react';
import dynamic from 'next/dynamic';
import PageWrapper from '@/components/sidenav/page-wrapper';

const Buyers = dynamic(() => import('./products/page'), { ssr: false });


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      
      <div className='flex-1'>
        <PageWrapper>{children}</PageWrapper>
        <Buyers />
      </div>
      
    </div>
  );
}
