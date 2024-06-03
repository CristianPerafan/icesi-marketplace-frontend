"use client";
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/buyers';
import React, { useEffect, useState } from 'react';
import { ProductEntity } from '@/model/product.entity';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useCart } from '@/context/cartContext';

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const { addToCart } = useCart();

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

  const handleButtonClick = () => {
    if (product) {
      addToCart(product); 
      console.log('Producto agregado al carrito:', product);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center" style={{ height: '100vh' }}>
      <div onClick={handleButtonClick}>
        <Card shadow="sm" className="custom-card">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover"
              style={{ height: '400px' }}
              src={product.image}
            />
          </CardBody>
          <CardFooter className="p-4 flex flex-col items-start"> 
            <b className="mb-2">{product.name}</b> 
            <p className="text-default-500">{`Precio: $${product.price.toLocaleString()} COP`}</p>
            <p>{product.description}</p>
            <div className="flex justify-between">
              
              <button className='mt-4 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors duration-300 '>Añadir al carrito</button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetail;
