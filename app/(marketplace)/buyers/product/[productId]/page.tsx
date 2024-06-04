"use client";
import { useParams } from 'next/navigation';
import { createOrder, getProductById, getProductsByCategory } from '@/services/buyers';
import React, { ReactNode, useEffect, useState } from 'react';
import { ProductEntity } from '@/model/product.entity';
import { Link } from '@nextui-org/link';
import { Button, Card, CardBody, CardFooter, Image, Tooltip, useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import {  useCartStore } from "@/app/providers";
import ConfirmModal from '@/components/modal';


function ProductDetail() {
    const params = useParams();
    const [product, setProduct] = useState<ProductEntity | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductEntity[]>([]);

    const { addItem } = useCartStore(state=>state);

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

    useEffect(() => {
        if (product) {
            getProductsByCategory(product.category)
                .then((data) => {
                    const updatedProducts = data.filter((p) => p.id !== product.id);
                    setRelatedProducts(updatedProducts);
                })
                .catch(error => {
                    console.error("Error fetching related products:", error);
                });
        }
    }, [product]);

    const { isOpen: isProductModalOpen, onOpen: onProductModalOpen, onOpenChange: onProductModalOpenChange } = useDisclosure();
    const [ProductSubmitMessage, setProductSubmitMessage] = React.useState<ReactNode>(null);
    const [isProductSubmitted, setIsProductSubmitted] = React.useState<boolean>(false);
    const [productToBuy, setProductToBuy] = React.useState<string>('');
    const [amountToBuy, setAmountToBuy] = React.useState<number>(1);

    const submitOrderHandler = async () => {
        if(product){        
            createOrder(productToBuy,amountToBuy, product?.sellerId).then((response) => {
                setProductSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                    <p className='text-sm'>Orden agregada correctamente.</p></div>)

                const timer = setTimeout(() => {
                    onProductModalOpenChange();
                    setProductSubmitMessage(null);
                    setIsProductSubmitted(false);
                    
                }, 2000);

            }).catch((error) => {
                setProductSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                    <p className='text-sm'>Error al agregar la orden.</p></div>)
            });
        }
    }


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ConfirmModal
                isOpen={isProductModalOpen}
                onOpen={onProductModalOpen}
                onOpenChange={onProductModalOpenChange}
                title='Confirmar'
                message='¿Estás seguro de que deseas ordenar este elemento?'
                onSubmit={submitOrderHandler}
                submitMessage={ProductSubmitMessage}
                isSubmitted={isProductSubmitted}
            />

        <div>
            <div className="flex flex-row p-6 gap-4 max-w-7xl m-auto">
                <div>
                    <img src={product.image} alt="Product-Image" className="w-full" />
                </div>
                <div className="flex flex-col">
                    <div>
                        <h1 className="text-3xl text-primary font-semibold sm:text-4xl">
                            {product.name}
                        </h1>
                        <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                            {product.description}
                        </p>
                        <span className="text-xl text-blue-500 font-semibold sm:text-2xl">
                            ${product.price}
                        </span>
                    </div>
                    <div className="text-left flex flex-col gap-2 w-full">
                        <label className="font-semibold">Quantity</label>
                        <input
                            id = "quantity"
                            className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-blue-500"
                            type="number"
                            defaultValue="1"
                            required
                            onChange={(e) => setAmountToBuy(Number(e.target.value))}
                        />
                        <div className="w-full text-left my-4">
                            
                                    <Button className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500 lg:m-0 md:px-6"
                                        title="Confirm Order"  onClick={() => { setProductToBuy(product.id); onProductModalOpen(); }} >Comprar</Button>
                                
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-6 gap-4 max-w-7xl m-auto">
                <h2 className="text-2xl font-semibold">Productos relacionados</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id}>
                            <Link href={`/buyers/product/${relatedProduct.id}`}>
                                <Card shadow="sm" isPressable className="custom-card">
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={relatedProduct.name}
                                            className="w-full object-cover"
                                            style={{ height: '200px', maxWidth: '300px' }}
                                            src={relatedProduct.image}
                                        />
                                    </CardBody>
                                    <CardFooter className="p-4 flex flex-col items-center">
                                        <b className="mb-2">{relatedProduct.name}</b>
                                        <p className="text-default-500">{`$${relatedProduct.price.toLocaleString()} COP`}</p>
                                        <div className="flex flex-row items-center gap-2">
                                            <Button isIconOnly size="md" className="mt-2" color='primary' variant='ghost' onClick={() => addItem({...product, quantity: 1})}>
                                                <Icon icon="lucide:shopping-cart" />
                                            </Button>
                                            <Tooltip content="Comprar">
                                                <Button size="md" color='primary' variant='bordered'>Comprar</Button>
                                            </Tooltip>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default ProductDetail;
