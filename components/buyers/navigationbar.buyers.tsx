"use client"
import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, Input, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Logo } from '../icons';
interface Props {
    signOut: () => void;
}

const NavigationbarBuyers: React.FC<Props> = ({ signOut }) => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionData = await getSession();
                setSession(sessionData);
            } catch (error) {
                console.error('Error fetching session:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a more elaborate loading component if needed
    }

    return (
        <div>
            <Navbar maxWidth="xl" position="sticky">
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand as="li" className="gap-3 max-w-fit">
                        <NextLink className="flex justify-start items-center gap-1" href="/">
                            <Logo />
                            <p className="text-lg font-bold text-inherit">Icesi Marketplace</p>
                        </NextLink>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[20rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Buscar un producto"
                        size="sm"
                        startContent={<i data-lucide="search"></i>}
                        type="search"
                    />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{`${session?.user.name} ${session?.user.lastName}`}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Configuración</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={signOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    );
};

export default NavigationbarBuyers;
