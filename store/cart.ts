import { ProductEntity } from '@/model/product.entity';
import { create, createStore } from 'zustand';

export interface ProductEntityCart extends ProductEntity {
    quantity: number;
}


export type CartState = {
    items: ProductEntityCart[];
};



export type CartActions = {
    addItem: (item: ProductEntityCart) => void;
    removeItem: (item: ProductEntityCart) => void;
    incrementItem: (id: string) => void;
    decrementItem: (id: string) => void;
};


export type CartStore = CartState & CartActions;


export const defaultCartState: CartState = {
    items: [],
};

export const createCartStore = (
    initState: CartState = defaultCartState
) =>{
    return createStore<CartStore>((set) => ({
        ...initState,
        addItem: (item: ProductEntityCart) => {
            console.log("Adding item to cart", item);
            set((state) => ({
                items: [...state.items, item],
            }));

        },
        removeItem: (item: ProductEntityCart) => {
            set((state) => ({
                items: state.items.filter((i) => i.id !== item.id),
            }));
        },
        incrementItem: (id: string) => {
            set((state) => ({
                items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            }));
        },
        decrementItem: (id: string) => {
            set((state) => ({
                items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                ),
            }));
        },
    }));
}
