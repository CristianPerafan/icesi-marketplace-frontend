"use client"
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/admin';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Link } from "@nextui-org/react";
import { UserEntity } from '@/model/user.entity';
import { useRouter } from 'next/navigation';
import '../../../../styles/globals.css';
import { AdminRoutes } from '@/config/routes';

function AdminUsers() {
    const [users, setUsers] = useState<UserEntity[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        getAllUsers().then((data) => {
            console.log(data);
            setUsers(data);
        });
    }, []);

    const handleRowClick = (id: string) => {
            router.push(`/admin/users/${id}`);
    };

    return (
        <>
        <div className='flex justify-between items-center mb-4 text-lg text-gray-800'>
            <h1 className='text-3xl font-bold mb-4'>Usuarios registrados</h1>
                <Tooltip content="Agregar">
                    <Link href={`${AdminRoutes.USERS+"/add"}`}>
                        <Button className='text-white' size='md' color="primary">
                            Agregar
                        </Button>
                    </Link>

                </Tooltip>
        </div>
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Roles</TableColumn>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id} onClick={() => handleRowClick(user.id)} className="hover:bg-gray-100 cursor-pointer">
                        <TableCell>{user.name + ' ' + user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.roles.map(capitalizeFirstLetter).join(', ')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    );
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default AdminUsers;
