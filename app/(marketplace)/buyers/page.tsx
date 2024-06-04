"use client";
import React, { useEffect, useState } from 'react';
import { getBuyersProducts } from '@/services/buyers';
import { ProductEntity } from "@/model/product.entity";
import { Button, Card, CardBody, CardFooter, Image, Tooltip } from "@nextui-org/react";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import {  useCartStore } from "@/app/providers";



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

    const { addItem } = useCartStore(
        state => state,
    );

    
    
    useEffect(() => {
        getBuyersProducts().then((data) => {
            const updatedProducts = data.map((product: ProductEntity) => ({
                ...product,
                img: product.image || categoryImages[product.category.toLowerCase()] || categoryImages['other']
            }));
            setProducts(updatedProducts);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }, []);





    return (
        <div className="flex justify-center">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
                {products.map((product) => (
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
                                <p className="text-default-500">{`$${product.price.toLocaleString()} COP`}</p>
                                <div className="flex flex-row items-center gap-2 mt-2">

                                    <Link href={`/buyers/cart`}>
                                    <Tooltip content="Agregar">
                                        <Button isIconOnly size="md" color='primary' variant='ghost' onClick={() => addItem({...product,quantity:5})}>
                                            <Icon icon="lucide:shopping-cart" />
                                        </Button>
                                    </Tooltip>
                                    </Link>


                                    <Link href={`/buyers/product/${product.id}`}>
                                        <Tooltip content="Comprar">
                                            <Button size="md" color='primary' variant='bordered'>Comprar</Button>
                                        </Tooltip>
                                    </Link>

                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Buyers;
