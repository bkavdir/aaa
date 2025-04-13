import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "@shared/schema";

// Extended CartItem type that includes product and variant info for UI
export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  variantId: number;
  quantity: number;
  createdAt: Date;
  product: Product;
  variant: ProductVariant;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartTotal: number;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Check if the product with the same variant is already in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      // If the item exists, update its quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }

      // Otherwise, add the new item to the cart
      // Assign a unique ID based on the current items
      const itemWithId = {
        ...newItem,
        id: prevItems.length > 0 ? Math.max(...prevItems.map(item => item.id)) + 1 : 1
      };
      
      return [...prevItems, itemWithId];
    });

    // Open cart drawer when adding an item
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        cartTotal,
        toggleCart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
