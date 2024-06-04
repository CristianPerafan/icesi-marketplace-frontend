'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOrderById } from '@/services/sellers';
import { OrderEntity } from '@/model/order.entity';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useParams } from 'next/navigation';
import { OrderItemEntity } from '@/model/orderItem.entity';

function OrderDetailsPage() {
  const params = useParams()
  const [order, setOrder] = React.useState<OrderEntity>()


  React.useEffect(() => {
    getOrderById(params.orderId as string).then((response) => {
      setOrder(response.data)
    })
  }, [])

  if (!order) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>Detalles de la Orden</h1>
        <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
          <p style={{ margin: '5px 0' }}>ID de la Orden: {order.id}</p>
          <p style={{ margin: '5px 0' }}>Comprador: {order.user.name}</p>
        </div>
        <h2 style={{ fontSize: '20px', color: '#555' }}>Productos:</h2>
      </div>

      <Table aria-label="Products Table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Estado</TableColumn>
          
        </TableHeader>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{order.accepted ? 'Aceptada' : 'Pendiente'}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderDetailsPage;