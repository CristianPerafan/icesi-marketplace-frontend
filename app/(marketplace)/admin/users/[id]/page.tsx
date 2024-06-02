"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '@/model/user.entity';
import { getOrdersByBuyer, getSellersProducts, getUserById } from '@/services/admin';
import { Button } from '@nextui-org/button';
import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { AdminRoutes, SellerRoutes } from '@/config/routes';
import ConfirmModal from '@/components/modal';
import { deleteProductById} from '@/services/sellers';
import { ProductEntity } from '@/model/product.entity';
import { OrderEntity } from '@/model/order.entity';

interface Props {
    params: { id: string }
}

function UserDetail({ params }: Props) {
    const [user, setUser] = useState<UserEntity | null>(null);
    const [orders, setOrders] = React.useState<OrderEntity[]>([]);

    const { id } = params;
    const router = useRouter()
    useEffect(() => {
        if (id) {
            getUserById(id as string).then((data) => {
                console.log(data);
                setUser(data);
            });
        }
    }, [id]);

    useEffect(() => {
        getOrdersByBuyer( id as string).then((response) => {
            console.log(response);
            setOrders(response.data);
        });
    }, []);


    const [products, setProducts] = React.useState<ProductEntity[]>([]);

    useEffect(() => {
        getSellersProducts(id).then((response) => {
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
    if (!user) return <div>Loading...</div>;

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

        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">User Details</h1>
            <div className="mb-4">
                <div className='flex space-x-4'>
                    <h2 className="text-2xl font-semibold">Basic Information</h2>
                    <Tooltip content="Details">
                        <span onClick={() => { router.push(AdminRoutes.USERS+"/"+id+"/edit"); } } className="text-2xl text-primary cursor-pointer active:opacity-100">
                            <Icon icon="lucide:pencil" />
                        </span>
                    </Tooltip>
                </div>
                <p><strong>Name:</strong> {user.name} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Roles:</strong> {user.roles && user.roles.length > 0 ? user.roles.map(capitalizeFirstLetter).join(', ') : 'No roles'}</p>
            </div>
            <div className='flex justify-between items-center mb-4 text-lg text-gray-800'>
                <h2 className="text-2xl font-semibold">Products</h2>
                <Tooltip content="Agregar">
                    <Link href={`${AdminRoutes.USERS+"/"+user.id+"/addProduct"}`}>
                        <Button className='text-white' size='md' color="primary">
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
        </div><div className="mb-4">
                <h2 className="text-2xl font-semibold">Orders</h2>
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
                            <TableCell>{user.name + " "+user.lastName}</TableCell>
                            <TableCell>{order.sellerUser.name+ " "+order.sellerUser.lastName }</TableCell>
                            <TableCell>{order.items.length}</TableCell>
                            <TableCell>{order.accepted ? "Accepted": "Not accepted"}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete order">
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div><div className="mb-4">
                <h2 className="text-2xl font-semibold">Sold Orders</h2>
                <ul>
                    {user.soldOrders && user.soldOrders.length > 0 && user.soldOrders.map((order) => (
                        <li key={order.id}>Order ID: {order.id}</li>
                    ))}
                </ul>
            </div><div className="mb-4">
                <h2 className="text-2xl font-semibold">Ratings</h2>
                <ul>
                    {user.ratings && user.ratings.length > 0 && user.ratings.map((rating) => (
                        <li key={rating.id}>Rating: {rating.stars}</li>
                    ))}
                </ul>
            </div><div className="mb-4">
                <h2 className="text-2xl font-semibold">Ratings Given</h2>
                <ul>
                    {user.ratingsGiven && user.ratingsGiven.length > 0 && user.ratingsGiven.map((rating) => (
                        <li key={rating.id}>Rating: {rating.stars}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}



// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default UserDetail
