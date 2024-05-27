"use client"
import React from 'react'
import { getSellersProducts } from '@/services/sellers';
import { ProductEntity } from "@/model/product.entity";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";


function Page() {

  const [products, setProducts] = React.useState<ProductEntity[]>([]);

  React.useEffect(() => {
    getSellersProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Descripción</TableColumn>
        <TableColumn>Precio</TableColumn>
        <TableColumn>Categoría</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Page
