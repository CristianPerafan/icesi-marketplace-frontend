"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '@/model/user.entity';
import { getOrdersByBuyer, getOrdersBySeller, getRatingsGiven, getRatingsReceived, getSellersProducts, getUserById, removeOrder, acceptOrder, removeRating, getOrderById, deleteOrderItem } from '@/services/admin';
import { Button } from '@nextui-org/button';
import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { AdminRoutes, SellerRoutes } from '@/config/routes';
import ConfirmModal from '@/components/modal';
import { deleteProductById } from '@/services/sellers';
import { ProductEntity } from '@/model/product.entity';
import { OrderEntity } from '@/model/order.entity';
import { RatingEntity } from '@/model/rating.entity';

interface Props {
    params: { id: string }
}

function OrderDetail({ params }: Props) {
    const [order, setOrder] = React.useState<OrderEntity>();

    const { id } = params;
    const router = useRouter()
    useEffect(() => {
        if (id) {
            getOrderById(id as string).then((data) => {
                console.log(data);
                setOrder(data.data);
            });
        }
    }, [id]);


    // Product Modal
    const { isOpen: isProductModalOpen, onOpen: onProductModalOpen, onOpenChange: onProductModalOpenChange } = useDisclosure();
    const [productSubmitMessage, setProductSubmitMessage] = React.useState<ReactNode>(null);
    const [isProductSubmitted, setIsProductSubmitted] = React.useState<boolean>(false);
    const [productToDelete, setProductToDelete] = React.useState<string>('');

    const deleteProduct = async () => {
        deleteOrderItem(productToDelete).then((response) => {
            setProductSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Item eliminado correctamente.</p></div>)

            const timer = setTimeout(() => {
                onProductModalOpenChange();
                setProductSubmitMessage(null);
                setIsProductSubmitted(false);
                getOrderById(id as string).then((data) => {
                    console.log(data);
                    setOrder(data.data);
                });
            }, 2000);

        }).catch((error) => {
            setProductSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al eliminar el Item.</p></div>)
        });
    }
    // Order Modal
    const { isOpen: isOrderModalOpen, onOpen: onOrderModalOpen, onOpenChange: onOrderModalOpenChange } = useDisclosure();
    const [orderSubmitMessage, setOrderSubmitMessage] = React.useState<ReactNode>(null);
    const [isOrderSubmitted, setIsOrderSubmitted] = React.useState<boolean>(false);
    const [orderToAccept, setOrderToAccept] = React.useState<string>('');

    const acceptOrderHandler = async () => {
        acceptOrder(orderToAccept).then((response) => {
            setOrderSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Orden aceptada correctamente.</p></div>)

            const timer = setTimeout(() => {
                onOrderModalOpenChange();
                setOrderSubmitMessage(null);
                setIsOrderSubmitted(false);
                getOrdersBySeller(id as string).then((response) => {
                    console.log(response);
                    setOrder(response.data);
                });
            }, 2000);

        }).catch((error) => {
            setOrderSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al aceptar la orden.</p></div>)
        });
    }

    //Order delete modal
    const { isOpen: isOrderDeleteModalOpen, onOpen: onOrderDeleteModalOpen, onOpenChange: onOrderDeleteModalOpenChange } = useDisclosure();
    const [orderDeleteSubmitMessage, setOrderDeleteSubmitMessage] = React.useState<ReactNode>(null);
    const [isOrderDeleteSubmitted, setIsOrderDeleteSubmitted] = React.useState<boolean>(false);
    const [orderToDelete, setOrderToDelete] = React.useState<string>('');

    const deleteOrderHandler = async () => {
        removeOrder(orderToDelete).then((response) => {
            setOrderDeleteSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Orden eliminada correctamente.</p></div>)

            const timer = setTimeout(() => {
                onOrderDeleteModalOpenChange();
                setOrderDeleteSubmitMessage(null);
                setIsOrderDeleteSubmitted(false);
                router.push(AdminRoutes.ORDERS)
            }, 2000);

        }).catch((error) => {
            setOrderSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al eliminar la orden.</p></div>)
        });
    }

    if (!order) return <div>Loading...</div>;
    return (
        <>
            <ConfirmModal
                isOpen={isOrderModalOpen}
                onOpen={onOrderModalOpen}
                onOpenChange={onOrderModalOpenChange}
                title='Confirmar'
                message='¿Estás seguro de aceptar esta orden?'
                onSubmit={acceptOrderHandler}
                submitMessage={orderSubmitMessage}
                isSubmitted={isOrderSubmitted}
            />

            <ConfirmModal
                isOpen={isProductModalOpen}
                onOpen={onProductModalOpen}
                onOpenChange={onProductModalOpenChange}
                title='Confirmar'
                message='¿Estás seguro de eliminar este producto?'
                onSubmit={deleteProduct}
                submitMessage={productSubmitMessage}
                isSubmitted={isProductSubmitted}
            />

            <ConfirmModal
                isOpen={isOrderDeleteModalOpen}
                onOpen={onOrderDeleteModalOpen}
                onOpenChange={onOrderDeleteModalOpenChange}
                title='Confirmar'
                message='¿Estás seguro de que desea eliminar esta orden?'
                onSubmit={deleteOrderHandler}
                submitMessage={orderDeleteSubmitMessage}
                isSubmitted={isOrderDeleteSubmitted}
            />
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Detalles de Orden</h1>
                <div className="mb-4">
                    <div className='flex space-x-4'>
                        <h2 className="text-2xl font-semibold">Información Básica</h2>
                        <Tooltip color="danger" content="Delete Order">
                            <span onClick={() => { setOrderToDelete(order.id); onOrderDeleteModalOpen(); }} className="text-2xl text-danger cursor-pointer active:opacity-100">
                                <Icon icon="eva:trash-2-outline" />
                            </span>
                        </Tooltip>
                    </div>
                    <p><strong>Nombre Comprador:</strong> {order.user.name} {order.user.lastName}</p>
                    <p><strong>Nombre Vendedor:</strong> {order.sellerUser.name} {order.sellerUser.lastName}</p>
                    <p><strong>Cantidad de productos:</strong> {order.items.length}</p>
                    <div className='flex space-x-4'>
                        <p><strong>Estado:</strong> {order.accepted ? "Aceptada" : "No ha sido aceptada"}</p>
                        {order.accepted ? "" :
                            <Tooltip color="success" content="Accept order">
                                <span onClick={() => { acceptOrder(order.id); onOrderModalOpen(); router.refresh() }} className="text-2xl text-success cursor-pointer active:opacity-50">
                                    <Icon icon="lucide:circle-check" />
                                </span>
                            </Tooltip>
                        }
                    </div>
                </div>
                <div className='flex justify-between items-center mb-4 text-lg text-gray-800'>
                    <h2 className="text-2xl font-semibold">Items de la orden</h2>
                </div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Descripción</TableColumn>
                        <TableColumn>Precio</TableColumn>
                        <TableColumn>Categoría</TableColumn>
                        <TableColumn>Cantidad</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.product.description}</TableCell>
                                <TableCell>{item.product.price}</TableCell>
                                <TableCell>{item.product.category}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip color="danger" content="Delete item">
                                            <span onClick={() => { setProductToDelete(item.id); onProductModalOpen(); }} className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <Icon icon="eva:trash-2-outline" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}


export default OrderDetail