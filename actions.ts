'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { DEFAULT_REDIRECT } from './routes';

const defaultValues = {
  email: '',
  password: '',
};

export async function login(formData: FormData) {
  try {

    const email = formData.get('email');
    const password = formData.get('password');

    await signIn('credentials', { email, password, redirectTo: DEFAULT_REDIRECT });

    return {
      message: 'success',
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'credentials error',
            errors: {
              ...defaultValues,
              credentials: 'incorrect email or password',
            },
          };
        default:
          return {
            message: 'unknown error',
            errors: {
              ...defaultValues,
              unknown: 'unknown error',
            },
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}