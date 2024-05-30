"use client"
import React, { ReactNode } from 'react'
import { deleteProductById, getSellersProducts } from '@/services/sellers';
import { ProductEntity } from "@/model/product.entity";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, useDisclosure } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { SellerRoutes } from '@/config/routes';
import ConfirmModal from '@/components/modal';


function Page() {

  const [products, setProducts] = React.useState<ProductEntity[]>([]);

  React.useEffect(() => {
    getSellersProducts().then((response) => {
      console.log(response);
      setProducts(response.data);
    });
  }, []);


  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitMessage, setSubmitMessage] = React.useState<ReactNode>(null);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const [productToDelete, setProductToDelete] = React.useState<string>('');


  const deleteProduct = async () => {
    deleteProductById(productToDelete).then((response) => {
      setSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
        <p className='text-sm'>Producto eliminado correctamente.</p></div>)

      const timer = setTimeout(() => {
        onOpenChange();
        setSubmitMessage(null);
        setIsSubmitted(false);
        setProducts(products.filter(product => product.id !== productToDelete));
      }, 2000);
      
    }).catch((error) => {
      setSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        <p className='text-sm'>Error al eliminar el producto.</p></div>)
    });
  }

  return (
    <>

      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title='Confirmar'
        message='¿Estás seguro de eliminar este producto?'
        onSubmit={() => deleteProduct()}
        submitMessage={submitMessage}
        isSubmitted={isSubmitted}
      />

      <div className='flex justify-between items-center mb-4 text-lg text-gray-800'>
        <h2>Tus Productos</h2>
        <Tooltip content="Agregar">
          <Link href={`${SellerRoutes.ADD_PRODUCT}`}>
            <Button className='text-white' size='md' color="primary" >
              Agregar
            </Button>
          </Link>

        </Tooltip>

      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">


                    <Link href={`${SellerRoutes.EDIT_PRODUCT.replace(':productId', product.id)}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <Icon icon="eva:info-outline" />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <span onClick={() => { setProductToDelete(product.id); onOpen() }} className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Icon icon="eva:trash-2-outline" />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Page
