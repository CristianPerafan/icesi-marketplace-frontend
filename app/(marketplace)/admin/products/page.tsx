"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '@/model/user.entity';
import { getOrdersByBuyer, getOrdersBySeller, getRatingsGiven, getRatingsReceived, getSellersProducts, getUserById, removeOrder, acceptOrder, getAllProducts } from '@/services/admin';
import { Button } from '@nextui-org/button';
import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { AdminRoutes, SellerRoutes } from '@/config/routes';
import ConfirmModal from '@/components/modal';
import { deleteProductById} from '@/services/sellers';
import { ProductEntity } from '@/model/product.entity';
import { OrderEntity } from '@/model/order.entity';
import { RatingEntity } from '@/model/rating.entity';


function Products( ) {
    const router = useRouter();
    const [products, setProducts] = React.useState<ProductEntity[]>([]);

    useEffect(() => {
        getAllProducts().then((response) => {
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
            message='¿Estás seguro de eliminar este elemento?'
            onSubmit={() => deleteProduct()}
            submitMessage={submitMessage}
            isSubmitted={isSubmitted}
            />
            
            <div className='flex justify-between items-center mb-4 text-lg text-gray-800'>
                <h2 className="text-2xl font-semibold">Productos</h2>
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Descripción</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Categoría</TableColumn>
                    <TableColumn>Nombre Usuario</TableColumn>
                    <TableColumn>Correo Usuario</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.user.name + " " + product.user.lastName}</TableCell>
                            <TableCell>{product.user.email}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span onClick={() => { router.push(AdminRoutes.EDIT_PRODUCT.replace(':productId', product.id)); } } className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Icon icon="eva:info-outline" />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete product">
                                        <span onClick={() => { setProductToDelete(product.id); onOpen(); } } className="text-lg text-danger cursor-pointer active:opacity-50">
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



// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Products
