"use client"
import { Input } from '@nextui-org/input'
import React, { ReactNode } from 'react'
import { ProductCategories, ProductEntity } from '@/model/product.entity'
import { Button, Link, Select, SelectItem, useDisclosure, Textarea } from '@nextui-org/react'
import { SellerRoutes } from '@/config/routes'
import { useForm } from 'react-hook-form'
import { getSession } from "next-auth/react";
import { addProduct } from '@/services/sellers'
import ConfirmModal from '@/components/modal'
import { useRouter } from 'next/navigation'


function Page() {

    const router = useRouter();


    const {
        register,
        watch,
        handleSubmit,
    } = useForm<ProductEntity>();


    // Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitMessage, setSubmitMessage] = React.useState<ReactNode>(null);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

    async function onSubmit(data: ProductEntity) {
        const session = await getSession()
        if (session) {


            const { price, ...rest } = data;
            const product = { ...rest, price: parseFloat(data.price.toString()) }

            addProduct(product).then((response) => {

                setIsSubmitted(true);


                setSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                    <p className='text-sm'>Producto agregado correctamente.</p></div>)

                const timer = setTimeout(() => {
                    setIsSubmitted(false);
                    onOpenChange();
                    setSubmitMessage(null);
                    router.push(`${SellerRoutes.PRODUCTS}`);
                }, 2000);
                return () => clearTimeout(timer);
            }).catch((error) => {
                setSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                    <p className='text-sm'>Error al agregar el producto.</p></div>)

            });
        }
    }




    return (

        <>

            <ConfirmModal
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                title='Confirmar'
                message='¿Estás seguro de guardar los cambios?'
                onSubmit={handleSubmit(onSubmit)}
                submitMessage={submitMessage}
                isSubmitted={isSubmitted}
            />
            <div className='flex flex-col py-14 px-2 md:py-2'>
                <div className='flex flex-col py-14 px-2 md:py-2'>
                    <div className='flex flex-col items-start'>
                        <h2 className='text-2xl font-semibold text-gray-800'>Productos</h2>

                    </div>
                </div>


                <form>
                    <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
                        <div className='flex flex-col'>
                            <Input
                                label='Nombre del producto'
                                labelPlacement='outside'
                                placeholder='Nombre del producto'
                                variant="bordered"
                                type='text'
                                {...register('name', { required: true })}
                            />
                        </div>
                        <div className='flex flex-col'>


                            <Input
                                label='Precio'
                                labelPlacement='outside'
                                placeholder='Precio'
                                variant="bordered"
                                type='number'
                                {...register('price', { required: true, valueAsNumber: true })}


                            />

                        </div>

                        <div className='flex flex-col'>
                            <Input
                                label='Imagen'
                                labelPlacement='outside'
                                placeholder='URL de la imagen'
                                variant="bordered"
                                type='text'
                                {...register('image', { required: true })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Select
                                size='md'
                                label='Estado'
                                variant='bordered'
                                placeholder='Ingresa el estado'
                                labelPlacement='outside'
                                {...register('category', { required: true })}
                            >
                                {
                                    ProductCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>

                        <div className='flex flex-col'>
                            <Textarea
                                label='Descripción'
                                labelPlacement='outside'
                                placeholder='Descripción'
                                variant="bordered"
                                type='text'
                                {...register('description', { required: true })}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center py-4 space-x-3'>
                        <Link href={`${SellerRoutes.PRODUCTS}`}>
                            <Button className='text-white' size='md' color="danger" >Cerrar</Button>
                        </Link>
                        <Button className='text-white' size='md' color="primary" onClick={() => onOpen()}>Guardar</Button>
                    </div>

                </form>

            </div>
        </>

    )
}

export default Page
