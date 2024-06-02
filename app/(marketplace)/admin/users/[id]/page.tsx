"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '@/model/user.entity';
import { getOrdersByBuyer, getOrdersBySeller, getRatingsGiven, getRatingsReceived, getSellersProducts, getUserById, removeOrder, acceptOrder, removeRating } from '@/services/admin';
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
    const [user, setUser] = useState<UserEntity | null>(null);
    const [orders, setOrders] = React.useState<OrderEntity[]>([]);
    const [sellerOrders, setSellerOrders] = React.useState<OrderEntity[]>([]);
    const [ratingsReceived, setratingsReceived] = React.useState<RatingEntity[]>([]);
    const [ratingsGiven, setRatingsGiven] = React.useState<RatingEntity[]>([]);

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
        getOrdersByBuyer(id as string).then((response) => {
            console.log(response);
            setOrders(response.data);
        });
    }, []);

    useEffect(() => {
        getOrdersBySeller(id as string).then((response) => {
            console.log(response);
            setSellerOrders(response.data);
        });
    }, []);

    useEffect(() => {
        getRatingsReceived(id as string).then((response) => {
            console.log(response);
            setratingsReceived(response.data);
        });
    }, []);

    useEffect(() => {
        getRatingsGiven(id as string).then((response) => {
            console.log(response);
            setRatingsGiven(response.data);
        });
    }, []);


    const [products, setProducts] = React.useState<ProductEntity[]>([]);

    useEffect(() => {
        getSellersProducts(id).then((response) => {
            console.log(response);
            setProducts(response.data);
        });
    }, []);


    // Product Modal
    const { isOpen: isProductModalOpen, onOpen: onProductModalOpen, onOpenChange: onProductModalOpenChange } = useDisclosure();
    const [productSubmitMessage, setProductSubmitMessage] = React.useState<ReactNode>(null);
    const [isProductSubmitted, setIsProductSubmitted] = React.useState<boolean>(false);
    const [productToDelete, setProductToDelete] = React.useState<string>('');

    const deleteProduct = async () => {
        deleteProductById(productToDelete).then((response) => {
            setProductSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Producto eliminado correctamente.</p></div>)

            const timer = setTimeout(() => {
                onProductModalOpenChange();
                setProductSubmitMessage(null);
                setIsProductSubmitted(false);
                setProducts(products.filter(product => product.id !== productToDelete));
            }, 2000);

        }).catch((error) => {
            setProductSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al eliminar el producto.</p></div>)
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
                    setSellerOrders(response.data);
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
                setOrders(orders.filter(order => order.id !== orderToDelete));
                setSellerOrders(sellerOrders.filter(order => order.id !== orderToDelete));
            }, 2000);

        }).catch((error) => {
            setOrderSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al eliminar la orden.</p></div>)
        });
    }

    const { isOpen: isRatingDeleteModalOpen, onOpen: onRatingDeleteModalOpen, onOpenChange: onRatingDeleteModalOpenChange } = useDisclosure();
    const [ratingDeleteSubmitMessage, setRatingDeleteSubmitMessage] = React.useState<ReactNode>(null);
    const [isRatingDeleteSubmitted, setIsRatingDeleteSubmitted] = React.useState<boolean>(false);
    const [ratingToDelete, setRatingToDelete] = React.useState<string>('');

    const deleteRatingHandler = async () => {
        removeRating(ratingToDelete).then((response) => {
            setRatingDeleteSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Orden eliminada correctamente.</p></div>)

            const timer = setTimeout(() => {
                onRatingDeleteModalOpenChange();
                setRatingDeleteSubmitMessage(null);
                setIsRatingDeleteSubmitted(false);
                setRatingsGiven(ratingsGiven.filter(rating => rating.id !== ratingToDelete));
                setratingsReceived(ratingsReceived.filter(rating => rating.id !== ratingToDelete));
            }, 2000);

        }).catch((error) => {
            setRatingDeleteSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>Error al eliminar la calificación.</p></div>)
        });
    }

    if (!user) return <div>Loading...</div>;

    return (
        <>

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

            <ConfirmModal
                isOpen={isRatingDeleteModalOpen}
                onOpen={onRatingDeleteModalOpen}
                onOpenChange={onRatingDeleteModalOpenChange}
                title='Confirmar'
                message='¿Estás seguro de que desea eliminar esta Calificación?'
                onSubmit={deleteRatingHandler}
                submitMessage={ratingDeleteSubmitMessage}
                isSubmitted={isRatingDeleteSubmitted}
            />



            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Detalles de usuario</h1>
                <div className="mb-4">
                    <div className='flex space-x-4'>
                        <h2 className="text-2xl font-semibold">Información Básica</h2>
                        <Tooltip content="Details">
                            <span onClick={() => { router.push(AdminRoutes.USERS + "/" + id + "/edit"); }} className="text-2xl text-primary cursor-pointer active:opacity-100">
                                <Icon icon="lucide:pencil" />
                            </span>
                        </Tooltip>
                    </div>
                    <p><strong>Nombre:</strong> {user.name} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Roles:</strong> {user.roles && user.roles.length > 0 ? user.roles.map(capitalizeFirstLetter).join(', ') : 'No roles'}</p>
                </div>
                <div className='flex justify-between items-center mb-4 text-lg text-gray-800'>
                    <h2 className="text-2xl font-semibold">Productos</h2>
                    <Tooltip content="Agregar">
                        <Link href={`${AdminRoutes.USERS + "/" + user.id + "/addProduct"}`}>
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
                                            <span onClick={() => { router.push(AdminRoutes.EDIT_PRODUCT.replace(':productId', product.id)); }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <Icon icon="eva:info-outline" />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete product">
                                            <span onClick={() => { setProductToDelete(product.id); onProductModalOpen(); }} className="text-lg text-danger cursor-pointer active:opacity-50">
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
                <h2 className="text-2xl font-semibold">Ordenes creadas por el usuario</h2>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre Comprador</TableColumn>
                        <TableColumn>Nombre Vendedor</TableColumn>
                        <TableColumn>Cantidad de productos</TableColumn>
                        <TableColumn>Estado</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{user.name + " " + user.lastName}</TableCell>
                                <TableCell>{order.sellerUser.name + " " + order.sellerUser.lastName}</TableCell>
                                <TableCell>{order.items.length}</TableCell>
                                <TableCell>{order.accepted ? "Accepted" : "Not accepted"}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span onClick={() => { router.push(AdminRoutes.READ_ORDER.replace(':OrderId', order.id)); }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <Icon icon="eva:info-outline" />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete product">
                                            <span onClick={() => { setOrderToDelete(order.id); onOrderDeleteModalOpen(); }} className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <Icon icon="eva:trash-2-outline" />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="success" content="Accept Order">
                                            <span onClick={() => { setOrderToAccept(order.id); onOrderModalOpen(); }} className="text-lg text-success cursor-pointer active:opacity-50">
                                                <Icon icon="lucide: circle-check" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div><div className="mb-4">
                <h2 className="text-2xl font-semibold">Ordenes de vendedor</h2>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre Comprador</TableColumn>
                        <TableColumn>Nombre Vendedor</TableColumn>
                        <TableColumn>Cantidad de productos</TableColumn>
                        <TableColumn>Estado</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {sellerOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{user.name + " " + user.lastName}</TableCell>
                                <TableCell>{order.sellerUser.name + " " + order.sellerUser.lastName}</TableCell>
                                <TableCell>{order.items.length}</TableCell>
                                <TableCell>{order.accepted ? "Accepted" : "Not accepted"}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span onClick={() => { router.push(AdminRoutes.READ_ORDER.replace(':OrderId', order.id)); }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
                                                <Tooltip color="success" content="Accept order">
                                                    <span onClick={() => { acceptOrder(order.id); onOrderModalOpen(); router.refresh() }} className="text-lg text-success cursor-pointer active:opacity-50">
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
            </div><div className="mb-4">
                <h2 className="text-2xl font-semibold">Calificaciones otorgadas por este usuario</h2>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre Autor</TableColumn>
                        <TableColumn>Nombre Vendedor</TableColumn>
                        <TableColumn>Descripción</TableColumn>
                        <TableColumn>Cantidad de Estrellas</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {ratingsGiven.map((rating) => (
                            <TableRow key={rating.id}>
                                <TableCell>{rating.author.name + " " + rating.author.lastName}</TableCell>
                                <TableCell>{rating.seller.name + " " + rating.seller.lastName}</TableCell>
                                <TableCell>{rating.description}</TableCell>
                                <TableCell>{rating.stars}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip color="danger" content="Delete Rating">
                                            <span onClick={() => { setRatingToDelete(rating.id); onRatingDeleteModalOpen(); }} className="text-lg text-danger cursor-pointer active:opacity-50">
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
                <h2 className="text-2xl font-semibold">Calificaciones recibidas</h2>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Nombre Autor</TableColumn>
                        <TableColumn>Nombre Vendedor</TableColumn>
                        <TableColumn>Descripción</TableColumn>
                        <TableColumn>Cantidad de Estrellas</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {ratingsReceived.map((rating) => (
                            <TableRow key={rating.id}>
                                <TableCell>{rating.author.name + " " + rating.author.lastName}</TableCell>
                                <TableCell>{rating.seller.name + " " + rating.seller.lastName}</TableCell>
                                <TableCell>{rating.description}</TableCell>
                                <TableCell>{rating.stars}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip color="danger" content="Delete Rating">
                                            <span onClick={() => { setRatingToDelete(rating.id); onRatingDeleteModalOpen(); }} className="text-lg text-danger cursor-pointer active:opacity-50">
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



// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default UserDetail
