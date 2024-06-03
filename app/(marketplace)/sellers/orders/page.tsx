"use client";
import React, { ReactNode, useState, useEffect } from 'react';
import { deleteOrderById, getSellersOrders } from '@/services/sellers'; 
import { OrderEntity } from "@/model/order.entity"; 
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, useDisclosure } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { SellerRoutes } from '@/config/routes';
import ConfirmModal from '@/components/modal';

function Page() {
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitMessage, setSubmitMessage] = useState<ReactNode>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] = useState<string>('');

  useEffect(() => {
    getSellersOrders().then((response) => {
      console.log(response);
      setOrders(response.data);
    });
  }, []);

  const deleteOrder = async () => {
    deleteOrderById(orderToDelete)
      .then((response) => {
        setSubmitMessage(
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
            <p className='text-sm'>Orden eliminada correctamente.</p>
          </div>
        );
        const timer = setTimeout(() => {
          onOpenChange();
          setSubmitMessage(null);
          setIsSubmitted(false);
          setOrders(orders.filter(order => order.id !== orderToDelete));
        }, 2000);
      })
      .catch((error) => {
        setSubmitMessage(
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className='text-sm'>Error al eliminar la orden.</p>
          </div>
        );
      });
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title='Confirmar'
        message='¿Estás seguro de eliminar esta orden?'
        onSubmit={() => deleteOrder()}
        submitMessage={submitMessage}
        isSubmitted={isSubmitted}
      />
      
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Comprador</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.accepted ? 'Aceptada' : 'Pendiente'}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Detalles">
                    <Link href={`${SellerRoutes.ORDER_DETAILS.replace(':orderId', order.id)}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <Icon icon="eva:info-outline" />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar orden">
                    <span onClick={() => { setOrderToDelete(order.id); onOpen() }} className="text-lg text-danger cursor-pointer active:opacity-50">
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
  );
}

export default Page;
