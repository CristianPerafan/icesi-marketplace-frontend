
import { auth } from '@/auth';
import React from 'react'
import { Card, CardHeader, Image } from "@nextui-org/react";




async function Sellers() {
  const session = await auth();



  return (


    <>
    <div className='flex flex-col gap-4 my-4'>
      <h1 className='text-2xl font-bold'>Bienvenido {session?.user.name} a la página de vendedores</h1>
      <p className='text-lg'>Aquí podrás ver tus productos y ventas</p>

      <div className=" justify-center  items-center max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        
        <Card className="col-span-12 sm:col-span-4 h-[300px]" >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Ver productos</p>
            <h4 className="text-white font-medium text-large">Explora los productos de tu tienda</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design_2fbf6ff5-8a54-45aa-b5b4-992118d4e2f4.jpg?v=1617647345"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Universidad Icesi</p>
            <h4 className="text-white font-medium text-large">Contribuye a la comunidad</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://radiodiezdemarzo.com/wp-content/uploads/2022/10/1-icesi.jpg"
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Ingresos</p>
            <h4 className="text-white font-medium text-large">Genera ingresos con tus productos</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-2.jpeg"
          />
        </Card>
      </div>
      </div>



    </>
  )
}

export default Sellers
