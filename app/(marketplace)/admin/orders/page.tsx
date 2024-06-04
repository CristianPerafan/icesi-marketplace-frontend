"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '@/model/user.entity';
import { getOrdersByBuyer, getOrdersBySeller, getRatingsGiven, getRatingsReceived, getSellersProducts, getUserById, removeOrder, acceptOrder, getOrdersAll } from '@/services/admin';
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

function UserDetail({ params }: Props) {
    const [orders, setOrders] = React.useState<OrderEntity[]>([]);
    const router = useRouter();

    useEffect(() => {
        getOrdersAll().then((response) => {
            console.log(response);
            setOrders(response.data);
        });
    }, []);



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
                getOrdersAll().then((response) => {
                    console.log(response);
                    setOrders(response.data);
                });
            }, 2000);

        }).catch((error) => {
            setOrderSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al aceptar la orden.</p></div>)
        });
    }

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
                setOrders(orders.filter(order => order.id !== orderToDelete));
            }, 2000);

        }).catch((error) => {
            setOrderSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al eliminar la orden.</p></div>)
        });
    }



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
                isOpen={isOrderDeleteModalOpen}
                onOpen={onOrderDeleteModalOpen}
                onOpenChange={onOrderDeleteModalOpenChange}
                title='Confirmar'
                message='¿Estás seguro de que desea eliminar esta orden?'
                onSubmit={deleteOrderHandler}
                submitMessage={orderDeleteSubmitMessage}
                isSubmitted={isOrderDeleteSubmitted}
            />


            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Ordenes</h2>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre Comprador</TableColumn>
                        <TableColumn>Nombre Vendedor</TableColumn>
                        <TableColumn>Cantidad de productos</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.user.name + " " + order.user.lastName}</TableCell>
                                <TableCell>{order.sellerUser.name + " " + order.sellerUser.lastName}</TableCell>
                                <TableCell>{order.items.length}</TableCell>
                                <TableCell>{order.accepted ? "Accepted" : "Not accepted"}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span onClick={() => { router.push(AdminRoutes.READ_ORDER.replace(':orderId', order.id)); }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <Icon icon="eva:info-outline" />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete Order">
                                            <span onClick={() => { setOrderToDelete(order.id); onOrderDeleteModalOpen(); }} className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <Icon icon="eva:trash-2-outline" />
                                            </span>
                                        </Tooltip>
                                        {
                                            order.accepted ? "" :
                                        <Tooltip color="success" content="Accept Order">
                                            <span onClick={() => { setOrderToAccept(order.id); onOrderModalOpen(); }} className="text-lg text-success cursor-pointer active:opacity-50">
                                                <Icon icon="lucide:circle-check" />
                                            </span>
                                        </Tooltip>
                                        }
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




export default UserDetail
