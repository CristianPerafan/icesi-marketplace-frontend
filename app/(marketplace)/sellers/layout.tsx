import MarginWidthWrapper from '@/components/sidenav/margin-width-wrapper';
import SideNav from '@/components/sidenav/side-nav';
import { Inter } from 'next/font/google';
import React from 'react'
import Header from '@/components/sidenav/header';
import HeaderMobile from '@/components/sidenav/header-mobile';
import PageWrapper from '@/components/sidenav/page-wrapper';
import { signOut } from 'next-auth/react';


const inter = Inter({ subsets: ['latin'] });


export default function Layout(
  { children, }:
    { children: React.ReactNode }) {

  return (

    <div className='flex'>
      <SideNav />
      <div className='flex-1'>
        <MarginWidthWrapper>
          <Header signOut={signOut}/>
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </div>
    </div>
  )
}
