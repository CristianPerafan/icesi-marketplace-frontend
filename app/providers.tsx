"use client";

import * as React from "react";
import { type StoreApi, useStore } from 'zustand'
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";


import { type CartStore, createCartStore } from "@/store/cart";

export const CartStoreContext = React.createContext<StoreApi<CartStore> | null>(null);

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();
	const storeRef = React.useRef<StoreApi<CartStore>>();

	if (!storeRef.current) {
		storeRef.current = createCartStore();
	}

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
				<CartStoreContext.Provider value={storeRef.current}>


					{children}
				</CartStoreContext.Provider>

			</NextThemesProvider>
		</NextUIProvider>

	);
}

export const useCartStore = <T,> (
	selector: (state: CartStore) => T
): T => {
	const cartStoreContext = React.useContext(CartStoreContext);
	if (!cartStoreContext) {
		throw new Error('useCartStore must be used within a CartStoreProvider');
	}
	return useStore(cartStoreContext,selector)
}
