"use client";
import { Logo } from '@/components/icons'
import React, { useEffect, useState } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { PublicRoutes } from '@/config/routes'
import { useRouter } from 'next/navigation'
import axios from 'axios';

function Register() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        lastName: "",
        roles: ["buyer"], // Default role
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const url = `${process.env.BACKEND_URL}/user`;

    const onSignup = async () => {
        try {
            console.log(url)
            const response = await axios.post(url, user);
            console.log("Signup success", response.data);
            router.push(PublicRoutes.LOGIN);
        } catch (error: any) {
            console.log("Signup failed", error.message);
            setRegisterError("No se pudo crear su cuenta con los datos ingresados")
            console.error(error.message);
        }
    }

    useEffect(() => {
        const isFormValid = user.email.length > 0 &&
                            user.password.length > 0 &&
                            user.name.length > 0 &&
                            user.lastName.length > 0 &&
                            user.password === confirmPassword;
        setButtonDisabled(!isFormValid);
        setPasswordError(user.password !== confirmPassword ? "Las contraseñas no coinciden" : "");
    }, [user, confirmPassword]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Logo />
                    Icesi Marketplace
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Crea una cuenta
                        </h1>
                        {registerError && (
                                <p className="text-sm text-red-600">
                                    {registerError}
                                </p>
                            )}
                        <form className="space-y-4 md:space-y-6">
                            <Input
                                name="name"
                                type="text"
                                className="mb-4 text-sm"
                                id="name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                label="Nombre"
                                placeholder="Ingresa tu nombre de usuario"
                            />
                            <Input
                                className="mb-4 text-sm"
                                name="lastname"
                                type="text"
                                id="lastname"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                label="Apellido"
                                placeholder="Ingresa tu apellido"
                            />
                            <Input
                                className="mb-4 text-sm"
                                name="email"
                                type="email"
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                label="Correo electrónico"
                                placeholder="Ingresa tu correo electrónico"
                            />
                            <Input
                                className="mb-4"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                name="password"
                                label="Contraseña"
                                placeholder="Ingresa tu contraseña"
                            />
                            <Input
                                name="confirmPassword"
                                className="mb-4"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                label="Confirma tu contraseña"
                                placeholder="Repite tu contraseña"
                            />
                            {passwordError && (
                                <p className="text-sm text-red-600">
                                    {passwordError}
                                </p>
                            )}
                            <div className="mb-4">
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona tu rol</label>
                                <select
                                    id="role"
                                    name="role"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={user.roles}
                                    onChange={(e) => setUser({ ...user, roles: [e.target.value] })}
                                >
                                    <option value="buyer">Comprador</option>
                                    <option value="seller">Vendedor</option>
                                </select>
                            </div>
                            <div className="mb-6 flex justify-center">
                                <Button
                                    onClick={onSignup}
                                    disabled={buttonDisabled}
                                    className="w-full"
                                    size="md" color="primary">
                                    Registrarse
                                </Button>
                            </div>
                        </form>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            ¿Ya tienes una cuenta? <Link href={PublicRoutes.LOGIN} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inicia sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;
