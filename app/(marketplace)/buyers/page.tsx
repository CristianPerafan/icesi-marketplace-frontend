import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/button';
import React from 'react';
import NextLink from 'next/link'; // Importar NextLink
import { Logo } from '@/components/icons';

async function Buyers() {
  const session = await auth();

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4">
        <div className="flex items-center gap-16"> 
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="text-lg font-bold text-inherit">Icesi Marketplace</p>
          </NextLink>
          <NextLink href="/buyers" style={{ marginRight: '20px' }}> 
            <p className="text-lg text-gray-500 font-bold">Listar productos</p>
          </NextLink>
        </div>
        <div className="flex items-center space-x-4 flex-grow relative">
          <div className="relative flex-grow"style={{ marginRight: '30px', marginLeft: '30px' }}>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 w-full" 
              style={{ paddingLeft: '20px', marginRight: '50px' }} 
            />
            <Button className="absolute top-0 right-0 bg-blue-400 h-full px-4">Buscar</Button>
          </div>
          <div className="flex items-center space-x-4 justify-end">
            <p>{session?.user?.email}</p>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button type='submit' className="bg-blue-400">
                Log Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buyers;
