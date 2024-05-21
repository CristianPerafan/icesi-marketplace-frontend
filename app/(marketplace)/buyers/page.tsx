import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/button';
import React from 'react'


async function Buyers() {
  const session = await auth();



  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>
          Log Out
        </Button>
      </form>
      <h1>Welcome</h1>
      <p>
        This is a buyer page. You can view the products and add them to your
        cart.
      </p>
      <p>{session?.user?.email}</p>
    </div>
  )
}

export default Buyers
