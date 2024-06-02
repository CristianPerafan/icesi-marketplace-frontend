"use client";
import React, { useEffect, useState, useContext } from 'react';
import { getBuyersProducts } from '@/services/buyers';
import { ProductEntity } from "@/model/product.entity";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartContext from '@/context/cartContext';
import { BuyerRoutes } from '@/config/routes';



// Mapeo de categorías a imágenes
const categoryImages: Record<string, string> = {
  'food': "https://i.ibb.co/s9pSR5y/Food.jpg",
  'drink': "https://i.ibb.co/3F0tWMT/Drink.jpg",
  'books': "https://i.ibb.co/XJrh38d/Books.jpg",
  'electronics': "https://i.ibb.co/PrnNZjX/Electronic.jpg",
  'fashion': "https://i.ibb.co/gMd7SdG/Fashion.jpg",
  'sports': "https://i.ibb.co/m0t9jVf/Sports.jpg",
  'other': "https://i.ibb.co/K7J6Bzr/Other.jpg",
};

function Buyers() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const router = useRouter();

  // Obtener el contexto del carrito
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getBuyersProducts().then((data) => {
      const updatedProducts = data.map(product => ({
        ...product,
        img: product.image || categoryImages[product.category.toLowerCase()] || categoryImages['other']
      }));
      setProducts(updatedProducts);
    }).catch(error => {
      console.error("Error fetching products:", error);
    });
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <Button className="bg-orange-500 py-4 px-10" auto flat onPress={() => router.push(BuyerRoutes.STORE)}>Ver Carrito</Button>
      </div>
      <div className="flex justify-center">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {products.map((product) => (
            <div key={product.id}>
              <Link href={`/buyers/${product.id}`}>
                <Card shadow="sm" isPressable className="custom-card">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={product.name}
                      className="w-full object-cover"
                      style={{ height: '200px', maxWidth: '300px' }}
                      src={product.img}
                    />
                  </CardBody>
                  <CardFooter className="p-4 flex flex-col items-start">
                    <b className="mb-2">{product.name}</b>
                    <p className="text-default-500">{`$${product.price.toLocaleString()} COP`}</p>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Buyers;
