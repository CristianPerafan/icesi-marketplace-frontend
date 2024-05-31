"use client"
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/admin';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { UserEntity } from '@/model/user.entity';
import { useRouter } from 'next/navigation';
import '../../../../styles/globals.css';

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
    );
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default AdminUsers;
