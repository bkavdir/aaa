import React from "react";
import { Link } from "wouter";
import { ShoppingBag, X, Headphones, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, toggleCart, cartTotal } = useCart();
  const isEmpty = cartItems.length === 0;

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md bg-black border-l border-[#990000]/40">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gothic-text text-white rave-glow">
            <ShoppingBag className="mr-2 h-5 w-5" />
            YOUR BASSLINE
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#990000]/20">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="bg-[#990000]/10 p-8 rounded-full mb-6 rave-border">
              <ShoppingBag className="h-16 w-16 text-white mb-4" />
            </div>
            <h3 className="text-xl font-medium mb-2 gothic-text text-white">Your cart is empty</h3>
            <p className="text-white/70 text-center mb-6">
              Drop some hard techno gear in your cart for the perfect rave outfit.
            </p>
            <Button asChild className="bg-[#990000] hover:bg-[#990000]/80 rave-border">
              <Link href="/shop">START SHOPPING</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex-1 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-auto pt-4">
              <Separator className="mb-4 bg-[#990000]/30" />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Subtotal</span>
                  <span className="text-white">€{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Shipping</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                
                <Separator className="bg-[#990000]/30" />
                
                <div className="flex justify-between font-medium">
                  <span className="text-white gothic-text">TOTAL</span>
                  <span className="text-white gothic-text">€{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <SheetFooter className="mt-6">
                <Button className="w-full bg-[#990000] hover:bg-[#990000]/80 rave-border gothic-text tracking-wider" asChild>
                  <Link href="/checkout">
                    <Zap className="mr-2 h-4 w-4" />
                    CHECKOUT
                  </Link>
                </Button>
              </SheetFooter>
              
              <p className="text-center text-xs text-white/50 mt-4">
                Free shipping on orders over €100
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
