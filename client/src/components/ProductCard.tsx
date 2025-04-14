import { Link } from "wouter";
import { useState } from "react";
import { Eye, ShoppingCart, Zap, Music, Headphones, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Product, ProductVariant } from "@shared/schema";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M"); // Default to medium size
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const isNew = product.isNewArrival;
  const isOnSale = product.salePrice !== null;


  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = () => {
    // Add the selected variant
    addToCart({
      id: 0, // This will be set by the server
      userId: 1, // Demo user
      productId: product.id,
      variantId: 1, // First variant
      quantity: 1,
      createdAt: new Date(),
      product: product,
      variant: {
        id: 1,
        productId: product.id,
        size: selectedSize,
        stockQuantity: 10
      }
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedSize}) added to your bassline`,
      variant: "default",
    });
    
    setIsQuickViewOpen(false);
  };

  // Direct add to cart from product card
  const handleDirectAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart();
  };

  return (
    <>
      <motion.div 
        className="bg-black border border-[#e60000]/20 rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_15px_rgba(230,0,115,0.3)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link href={`/product/${product.slug}`}>
          <div className="relative group">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity flex items-end justify-between p-4">
              <Button 
                onClick={handleQuickView}
                className="bg-black/70 border border-[#e60000]/50 text-white hover:bg-[#e60000]/80 py-2 px-4 text-sm tracking-wider transform -translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100 flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
              
              <Button 
                onClick={handleDirectAddToCart}
                className="bg-[#e60000] text-white hover:bg-[#e60000]/80 py-2 px-4 text-sm tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100 flex items-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
            
            {isNew && (
              <div className="absolute top-2 right-2 bg-[#FFEC00] text-black text-xs font-bold px-2 py-1 rounded-sm gothic-text">
                NEW DROP
              </div>
            )}
            
            {isOnSale && (
              <div className="absolute top-2 left-2 bg-[#e60000] text-white text-xs font-bold px-2 py-1 rounded-sm gothic-text">
                SALE
              </div>
            )}
          </div>
          
          <div className="p-4 relative">
            <div className="absolute top-0 right-0 transform -translate-y-1/2 bg-black border border-[#e60000]/50 rounded-full py-1 px-3 flex items-center">
              <Headphones className="w-3 h-3 mr-1 text-[#e60000]" />
              <span className="text-xs text-white">Hard Techno</span>
            </div>
            
            <h3 className="font-bold mb-2 text-white gothic-text tracking-wide">{product.name}</h3>
            <div className="flex justify-between items-center">
              <div>
                {isOnSale ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-[#e60000] font-bold">€{product.salePrice?.toFixed(2)}</span>
                    <span className="text-white/50 line-through text-sm">€{product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-white font-bold">€{product.price.toFixed(2)}</span>
                )}
              </div>
              
            </div>
          </div>
        </Link>
      </motion.div>
      
      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="sm:max-w-[800px] bg-black border border-[#e60000]/40">
          <DialogHeader>
            <DialogTitle className="text-white gothic-text tracking-wide">{product.name}</DialogTitle>
            <DialogDescription className="text-white/70">Underground techno essential</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="border border-[#e60000]/30 rounded-md overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="mb-4">
                {isOnSale ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#e60000] gothic-text">€{product.salePrice?.toFixed(2)}</span>
                    <span className="text-white/50 line-through">€{product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-white gothic-text">€{product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-white/70 mb-6">
                {product.description.length > 150 
                  ? `${product.description.slice(0, 150)}...` 
                  : product.description}
              </p>
              
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2 text-white gothic-text">SIZE</h4>
                <div className="flex space-x-2">
                  {["S", "M", "L"].map((size) => (
                    <Button 
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size 
                        ? "min-w-[40px] bg-[#e60000] hover:bg-[#e60000]/80 border-[#e60000] text-white" 
                        : "min-w-[40px] border-[#e60000]/40 text-white hover:bg-[#e60000]/20"
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#e60000] text-white hover:bg-[#e60000]/80 gothic-text tracking-wider"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  ADD TO CART
                </Button>
                
                <DialogClose asChild>
                  <Button variant="outline" className="border-[#e60000]/40 text-white hover:bg-[#e60000]/20">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
