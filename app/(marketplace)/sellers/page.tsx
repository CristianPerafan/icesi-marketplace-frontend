import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/button';
import React from 'react'


async function Sellers() {
  const session = await auth();


  return (

    
    <>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit eos iste corporis repudiandae. Quas architecto non commodi quisquam facilis nobis laudantium, fugiat delectus reprehenderit nesciunt voluptate quod tempora culpa.
      </p>
      <p>{session?.user?.email}</p>
    </>
  )
}

export default Sellers
