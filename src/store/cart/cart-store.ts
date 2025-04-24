import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    totalItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
  
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const subTotal = cart.reduce(
          (subTotal, item) => subTotal + (item.price * item.quantity),
          0
        );
        const tax = subTotal * 0.15; // Assuming a tax rate of 15%
        const total = subTotal + tax;
        return { totalItems, subTotal, tax, total };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCart });
      },
    }),
    
    {
      name: "shopping-cart",
    }
  )
);
