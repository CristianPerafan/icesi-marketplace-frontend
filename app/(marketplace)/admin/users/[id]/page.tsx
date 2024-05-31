"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserEntity } from '@/model/user.entity';
import { getUserById } from '@/services/admin';

interface Props {
    params: { id: string }
}

function UserDetail({ params }: Props) {
    const [user, setUser] = useState<UserEntity | null>(null);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        if (id) {
            getUserById(id as string).then((data) => {
                console.log(data);
                setUser(data);
            });
        }
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">User Details</h1>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Basic Information</h2>
                <p><strong>Name:</strong> {user.name} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Roles:</strong> {user.roles && user.roles.length > 0 ? user.roles.map(capitalizeFirstLetter).join(', ') : 'No roles'}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Products</h2>
                {user.products && user.products.length > 0 ? (
                    <table className="min-w-full border-collapse block md:table">
                        <thead className="block md:table-header-group">
                            <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 block md:table-cell">Name</th>
                                <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 block md:table-cell">Description</th>
                                <th className="bg-gray-200 p-2 text-gray-700 font-bold md:border md:border-gray-300 block md:table-cell">Category</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group">
                            {user.products.map((product) => (
                                <tr key={product.id} className="bg-gray-100 border border-gray-300 md:border-none block md:table-row">
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{product.name}</td>
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{product.description}</td>
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No products available</p>
                )}
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Orders</h2>
                <ul>
                    {user.orders && user.orders.length > 0 && user.orders.map((order) => (
                        <li key={order.id}>Order ID: {order.id}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Sold Orders</h2>
                <ul>
                    {user.soldOrders && user.soldOrders.length > 0 && user.soldOrders.map((order) => (
                        <li key={order.id}>Order ID: {order.id}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Ratings</h2>
                <ul>
                    {user.ratings && user.ratings.length > 0 && user.ratings.map((rating) => (
                        <li key={rating.id}>Rating: {rating.stars}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Ratings Given</h2>
                <ul>
                    {user.ratingsGiven && user.ratingsGiven.length > 0 && user.ratingsGiven.map((rating) => (
                        <li key={rating.id}>Rating: {rating.stars}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default UserDetail;
