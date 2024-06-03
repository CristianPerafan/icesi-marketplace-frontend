"use client";

import ConfirmModal from "@/components/modal";
import { AdminRoutes } from "@/config/routes";
import { UserEntity, userRoles } from "@/model/user.entity";
import { getUserById, updateUser } from "@/services/admin";
import { Button, Card, CardBody, CardFooter, Input, Link, Select, SelectItem, Selection, Textarea, useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
    params: { id: string }
}


function Page() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const [user, setUser] = React.useState<UserEntity>()


    const {
        register,
        watch,
        control,
        reset,
        formState: { errors },
        handleSubmit
    } = useForm<UserEntity>({ defaultValues: user });


    useEffect(() => {
        if (id) {
            getUserById(id as string).then((data) => {
                console.log(data);
                setUser(data);
            });
        }
    }, [id]);

    React.useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user])


    // Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitMessage, setSubmitMessage] = React.useState<ReactNode>(null);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

    const [selectedRoles, setSelectedRoles] = useState(user?.roles || []);

    const handleRoleToggle = (role: string) => {
        let updatedRoles: string[];
        if (selectedRoles.includes(role)) {
            updatedRoles = selectedRoles.filter((r: string) => r !== role);
        } else {
            updatedRoles = [...selectedRoles, role];
        }

        setSelectedRoles(updatedRoles as string[]);
        setUser({ ...user!, roles: updatedRoles });
    };

    const onsubmit = async (data: UserEntity) => {
        setIsSubmitted(true)
        updateUser(data).then((response) => {
            setSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Usuario actualizado correctamente.</p></div>)

            const timer = setTimeout(() => {
                setIsSubmitted(false);
                onOpenChange();
                setSubmitMessage(null);
                router.push(AdminRoutes.USERS)
            }, 2000);

            return () => clearTimeout(timer);
        }).catch((error) => {
            setSubmitMessage(<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className='text-sm'>{error.message}.</p></div>)
        });
    }

    return (
        <>

            <ConfirmModal
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                title='Confirmar'
                message='¿Estás seguro de guardar los cambios?'
                onSubmit={handleSubmit(onsubmit)}
                submitMessage={submitMessage}
                isSubmitted={isSubmitted}
            />


            <div className='flex flex-col justify-center items-center py-2'>
                <Card shadow="sm" key={user?.id} isPressable >
                    <CardBody className="overflow-visible p-0">
                        <b>{user?.name}</b>
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <p className="text-default-500">{user?.roles.join(", ")}</p>
                    </CardFooter>
                </Card>

            </div>

            <form>
                <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
                    <div className='flex flex-col'>
                        <Controller
                            name='name'
                            control={control}
                            rules={
                                {
                                    required: "**Este campo es requerido**",
                                }
                            }
                            render={({ field }) => (
                                <Input
                                    label='Nombre del usuario'
                                    labelPlacement='outside'
                                    variant="bordered"
                                    type='text'
                                    value={user?.name}
                                    onChange={(e) => setUser({ ...user as UserEntity, name: e.target.value })}

                                />
                            )}

                        />
                    </div>
                    <div className='flex flex-col'>
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                                required: "**Este campo es requerido**",
                            }
                            }
                            render={({ field }) =>
                                <Input
                                    label='Apellido'
                                    labelPlacement='outside'
                                    type='text'
                                    variant="bordered"
                                    value={user?.lastName}
                                    onChange={(e) => setUser({ ...user as UserEntity, lastName: e.target.value })}
                                />
                            }
                        />


                    </div>

                    <div className='flex flex-col'>
                        <Controller
                            name='email'
                            control={control}
                            rules={
                                {
                                    required: "**Este campo es requerido**",
                                }
                            }
                            render={({ field }) => (
                                <Input
                                    label='Correo electrónico'
                                    labelPlacement='outside'
                                    variant="bordered"
                                    type='text'
                                    value={user?.email}
                                    onChange={(e) => setUser({ ...user as UserEntity, email: e.target.value })}
                                />
                            )}
                        />

                    </div>
                    <div className='flex flex-col'>
                        <Controller
                            name='roles'
                            control={control}
                            rules={{ required: "**Este campo es requerido**" }}
                            render={({ field }) => (
                                <div>
                                    <label className='block mb-2'>Estado</label>
                                    <div className='flex flex-wrap gap-2'>
                                        {userRoles.map((role) => (
                                            <button
                                                key={role}
                                                type='button'
                                                className={`px-3 py-1 rounded-full border ${selectedRoles.includes(role)
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-white text-black'
                                                    }`}
                                                onClick={() => {
                                                    handleRoleToggle(role);
                                                    field.onChange(selectedRoles);
                                                }}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className='flex flex-row justify-center py-4 space-x-3'>
                    <Link href={`${AdminRoutes.USERS}`}>
                        <Button className='text-white' size='md' color="danger" >Cerrar</Button>
                    </Link>
                    <Button className='text-white' size='md' color="primary" onClick={() => onOpen()}>Guardar</Button>
                </div>
            </form>
        </>

    )
}

export default Page;