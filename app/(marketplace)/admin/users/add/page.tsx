"use client";

import ConfirmModal from "@/components/modal";
import { AdminRoutes } from "@/config/routes";
import { CreateUserEntity, UserEntity, userRoles } from "@/model/user.entity";
import { addUser, getUserById, updateUser } from "@/services/admin";
import { Button, Card, CardBody, CardFooter, Input, Link, Select, SelectItem, Selection, Textarea, useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";


function Page() {
    const router = useRouter();
    const [user, setUser] = React.useState<CreateUserEntity>({
        email: "",
        password: "",
        name: "",
        lastName: "",
        roles: [], // Default role
    })


    const {
        register,
        watch,
        control,
        reset,
        formState: { errors },
        handleSubmit
    } = useForm<CreateUserEntity>({ defaultValues: user });


    // Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitMessage, setSubmitMessage] = React.useState<ReactNode>(null);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

    const [selectedRoles, setSelectedRoles] = useState(user?.roles || []);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [registerError, setRegisterError] = useState("");
    React.useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            const isFormValid = user.email.length > 0 &&
                user.password.length > 0 &&
                user.name.length > 0 &&
                user.lastName.length > 0 &&
                user.password === confirmPassword;
            setButtonDisabled(!isFormValid);
            setPasswordError(user.password !== confirmPassword ? "Las contraseñas no coinciden" : "");
        }
    }, [user, confirmPassword]);

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

    const onsubmit = async (data: CreateUserEntity) => {
        setIsSubmitted(true)
        console.log(selectedRoles)
        setUser({ ...user!, roles: selectedRoles });
        addUser(user as CreateUserEntity).then((response) => {
            setSubmitMessage(<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p className='text-sm'>Usuario creado correctamente.</p></div>)

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
            <form>
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
                                onChange={(e) => setUser({ ...user as CreateUserEntity, name: e.target.value })}

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
                                onChange={(e) => setUser({ ...user as CreateUserEntity, lastName: e.target.value })}
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
                                type='email'
                                value={user?.email}
                                onChange={(e) => setUser({ ...user as CreateUserEntity, email: e.target.value })}
                            />
                        )}
                    />

                </div>

                <div className='flex flex-col'>
                    <Controller
                        name='password'
                        control={control}
                        rules={
                            {
                                required: "**Este campo es requerido**",
                            }
                        }
                        render={({ field }) => (
                            <Input
                                label='Contraseña'
                                labelPlacement='outside'
                                variant="bordered"
                                type='password'
                                value={user?.password}
                                onChange={(e) => setUser({ ...user as CreateUserEntity, password: e.target.value })}
                            />
                        )}
                    />
                    <div className='flex flex-col'>

                        <Input
                            label='Confirmar contraseña'
                            labelPlacement='outside'
                            variant="bordered"
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {passwordError && (
                        <p className="text-sm text-red-600">
                            {passwordError}
                        </p>
                    )}
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
                    <Button className='text-white' size='md' color="primary" onClick={() => onOpen()} disabled={buttonDisabled}>Guardar</Button>
                </div>
            </form>
        </>

    )
}

export default Page;