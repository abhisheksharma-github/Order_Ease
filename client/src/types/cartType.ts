import { MenuItem } from "./restaurantType";

export interface CartItem extends MenuItem { 
    quantity: number;
}

export type CartState = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void; // ✅ Fixed: Should accept CartItem instead of MenuItem
    clearCart: () => void;
    removeFromCart: (id: string) => void; // ✅ Renamed for better readability
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
};
