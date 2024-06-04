"use client"
import React, { useEffect } from 'react';
import { Card, CardBody, Image, CardFooter, Button, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import {  useCartStore } from "@/app/providers";
import { ProductEntityCart } from '@/store/cart';


function Cart() {

  const { items } = useCartStore(state => state);


  




  const handleIncrement = (id: string) => {
    console.log("Incrementing product with id: ", id);

  };

  const handleDecrement = (id: string) => {
    console.log("Decrementing product with id: ", id);

  };




  return (
    <div className='flex flex-col justify-center px-4'>
      <h2 className="text-2xl font-semibold">Tu Carrito</h2>
      <p className="text-default-500">Revisa los productos que has agregado al carrito</p>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4'>
          {items.map((product:ProductEntityCart) => (
            <div key={product.id}>
              <Card shadow="sm" isPressable className="custom-card">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={product.name}
                    className="w-full object-cover"
                    style={{ height: '200px', maxWidth: '300px' }}
                    src={product.image}
                  />
                </CardBody>
                <CardFooter className="p-4 flex flex-col items-center">
                  <b className="mb-2">{product.name}</b>
                  <p className="text-default-500">{`$${(product.price * product.quantity).toLocaleString()} COP`}</p>
                  <p className="text-default-500">{`Cantidad: ${product.quantity}`}</p>
                  <div className="text-default-500 flex items-center">
                    <Button isIconOnly variant='light' color='danger' onClick={() => handleDecrement(product.id)}><Icon icon="lucide:minus" /></Button>
                    <span className="mx-2">{product.quantity}</span>
                    <Button isIconOnly variant='light' color='success' onClick={() => handleIncrement(product.id)}><Icon icon="lucide:plus" /></Button>
                  </div>
                  <div className="flex flex-row items-center gap-2">

                    <Tooltip content="Comprar">
                      <Button isIconOnly size="md" className="mt-2" color='danger' variant='ghost' onClick={() => console.log('redx')}>
                        <Icon icon="lucide:trash-2" />
                      </Button>
                    </Tooltip>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}


      <div className="w-full text-left my-4">

        <Button
          className='w-full'
          size='lg'
          color='primary'
          variant='shadow'
        >
          Cofirmar pedido
        </Button>

      </div>

    </div>
  );
}

export default Cart;


