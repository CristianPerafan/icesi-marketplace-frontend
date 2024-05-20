import { Logo } from '@/components/icons'
import React from 'react'
import { Input } from '@nextui-org/input'
import { login } from '@/actions'
import { Button } from '@nextui-org/button'



function SignIn() {

  return (


    <section className="classbg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Logo />
          Icesi Marketplace
        </a>


        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión en tu cuenta
            </h1>


            <form className="space-y-4 md:space-y-6"
              action={async (formData) => {
                "use server"
                await login(formData)
              }}>

              <Input name="email" type="email"className="mb-4 text-sm" label="Nombre de usuario" placeholder="Ingresa tu nombre de usuario" />


              <div className="text-right mb-8">
                <Input name="password" className="mb-4" type="password" label="Contraseña" placeholder="Ingresa tu contraseña" />
                <a href="#" className="text-sm text-primary	underline">
                  <p className="">¿Olvidaste tu contraseña?</p>
                </a>
              </div>
              <div className="mb-6 flex justify-center">
                <Button className="w-full " size="md" color="primary" type='submit'>Login</Button>
              </div>
            </form>


            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              No tienes cuenta? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</a>
            </p>
          </div>


        </div>
      </div>

    </section>

  )
}

export default SignIn
