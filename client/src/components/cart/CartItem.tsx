import React from "react";
import { Minus, Plus, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change);
    updateCartItemQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-[#e60000]/30">
      {/* Product Image */}
      <div className="w-20 h-20 bg-black rounded-md overflow-hidden flex-shrink-0 border border-[#e60000]/30">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-1 text-white gothic-text">{item.product.name}</h4>
        
        <div className="flex flex-wrap gap-x-2 text-xs text-white/60 mt-1">
          <span>Size: {item.variant.size}</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 border-[#e60000]/40 text-white hover:bg-[#e60000]/20 hover:border-[#e60000]" 
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-6 text-center text-sm text-white">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 border-[#e60000]/40 text-white hover:bg-[#e60000]/20 hover:border-[#e60000]" 
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center">
            <span className="font-medium mr-2 text-white">
              €{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white/60 hover:text-[#e60000] hover:bg-[#e60000]/10" 
              onClick={handleRemove}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
