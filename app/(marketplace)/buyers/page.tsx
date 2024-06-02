import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/button';
import React from 'react';

async function Buyers() {
  const session = await auth();

  return (
    <div className="flex justify-between items-center bg-blue-200 p-4">
      <div>
        <h1>Welcome</h1>
        <p>
          This is a buyer page. You can view the products and add them to your
          cart.
        </p>
      </div>
      <div className="flex items-center space-x-4">
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
  );
}

export default Buyers;
