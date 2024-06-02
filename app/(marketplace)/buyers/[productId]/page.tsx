"use client";
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/buyers';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductEntity } from '@/model/product.entity';
import { BASE_BUYER_ROUTE } from '@/config/routes';
import { Button } from '@nextui-org/button';

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<ProductEntity | null>(null);

  useEffect(() => {
    if (params.productId) {
      getProductById(params.productId as string)
        .then((data) => {
          setProduct(data);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }, [params.productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="flex flex-col">
      
      <Link href={`${BASE_BUYER_ROUTE}`}>
        <Button className='text-white' size='md' color="primary" >
          Listar productos
        </Button>
      </Link>
      <div className="flex justify-center p-4">
        <div>
          <img
            alt={product.name}
            className="w-full object-cover"
            style={{ height: '400px', maxWidth: '600px' }}
            src={product.image}
          />
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg">{`Precio: $${product.price.toLocaleString()} COP`}</p>
            <p>{product.description}</p>
            <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg'>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
