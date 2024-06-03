"use client"
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '@/services/sellers'
import React, { ReactNode } from 'react'
import { ProductEntity, ProductCategories } from '@/model/product.entity'
import { AdminRoutes, SellerRoutes } from '@/config/routes'
import { Card, CardBody, Image, Input, Select, Link, Button, SelectItem, CardFooter, Textarea } from "@nextui-org/react";
import { Controller, useForm } from 'react-hook-form'
import { useDisclosure } from "@nextui-org/react";
import ConfirmModal from '@/components/modal'


function Page() {


  const params = useParams()
  const router = useRouter();
  const [product, setProduct] = React.useState<ProductEntity>()

  const {
    register,
    watch,
    control,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<ProductEntity>({ defaultValues: product });




  React.useEffect(() => {
    getProductById(params.productId as string).then((response) => {
      setProduct(response.data)
    })
  }, [])


  React.useEffect(() => {
    if (product) {
      reset(product)
    }
  }, [product])


  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitMessage, setSubmitMessage] = React.useState<ReactNode>(null);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);



  const onsubmit = async (data: ProductEntity) => {
    setIsSubmitted(true)
    updateProduct(data).then((response) => {
      setSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
        <p className='text-sm'>Producto actualizado correctamente.</p></div>)

      const timer = setTimeout(() => {
        setIsSubmitted(false);
        onOpenChange();
        setSubmitMessage(null);
        router.push(AdminRoutes.USERS+"/"+product?.sellerId)
      }, 2000);

      return () => clearTimeout(timer);
    }).catch((error) => {
      setSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        <p className='text-sm'>{error.message}.</p></div>)
    });
  }

  return (
    <>

      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title='Confirmar'
        message='¿Estás seguro de guardar los cambios?'
        onSubmit={handleSubmit(onsubmit)}
        submitMessage={submitMessage}
        isSubmitted={isSubmitted}
      />


      <div className='flex flex-col justify-center items-center py-2'>
        <Card shadow="sm" key={product?.id} isPressable >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={product?.name}
              className="w-full object-cover h-[140px]"
              src={product?.image}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{product?.name}</b>
            <p className="text-default-500">{product?.price}</p>
          </CardFooter>
        </Card>

      </div>

      <form>
        <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
          <div className='flex flex-col'>
            <Controller
              name='name'
              control={control}
              rules={
                {
                  required: "**Este campo es requerido**",
                }
              }
              render={({ field }) => (
                <Input
                  label='Nombre del producto'
                  labelPlacement='outside'
                  placeholder='Nombre del producto'
                  variant="bordered"
                  type='text'
                  {...field}

                />
              )}

            />
          </div>
          <div className='flex flex-col'>
            <Controller
              name="price"
              control={control}
              rules={{
                required: "**Este campo es requerido**",
              }
              }
              render={({ field: { onChange, value } }) =>
                <Input
                  size='lg'
                  label='Puntos en la plataforma'
                  description='Ingresa los puntos por la venta del producto'
                  labelPlacement='outside'
                  type='number'
                  onChange={onChange}
                  value={String(value)}
                />
              }
            />


          </div>

          <div className='flex flex-col'>
            <Controller
              name='image'
              control={control}
              rules={
                {
                  required: "**Este campo es requerido**",
                }
              }
              render={({ field }) => (
                <Input
                  label='Imagen'
                  labelPlacement='outside'
                  placeholder='URL de la imagen'
                  variant="bordered"
                  type='text'
                  {...field}
                />
              )}
            />

          </div>
          <div className='flex flex-col'>
            <Controller
              name='category'
              control={control}
              rules={{ required: "**Este campo es requerido**" }}
              render={(field) => {
                return (
                  <Select
                    {...field}
                    size='md'
                    label='Estado'
                    variant='bordered'
                    placeholder='Ingresa el estado'
                    labelPlacement='outside'
                    selectedKeys={[field.field.value]}

                    {...register('category')}
                  >
                    {
                      ProductCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))
                    }
                  </Select>
                )

              }
              }
            />
          </div>
          <div className='flex flex-col'>
            <Controller
              name='description'
              control={control}
              rules={
                {
                  required: "**Este campo es requerido**",
                }
              }
              render={({ field }) => (
                <Textarea
                  label='Descripción'
                  labelPlacement='outside'
                  placeholder='Descripción'
                  variant="bordered"
                  {...field}
                />
              )} />
          </div>
        </div>

        <div className='flex flex-row justify-center py-4 space-x-3'>
          <Link href={`${AdminRoutes.USERS+"/"+product?.sellerId}`}>
            <Button className='text-white' size='md' color="danger" >Cerrar</Button>
          </Link>
          <Button className='text-white' size='md' color="primary" onClick={() => onOpen()}>Guardar</Button>
        </div>
      </form>
    </>



  )
}

export default Page
