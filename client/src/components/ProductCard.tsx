import { Link } from "wouter";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product, ProductVariant } from "@shared/schema";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  
  const isNew = product.isNewArrival;
  const isOnSale = product.salePrice !== null;

  // Demo colors for variants
  const colors = ["Cyan", "Magenta", "Yellow", "Black", "White", "Silver"];
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = () => {
    // For demo purposes, we'll add the first variant
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
        color: colors[0],
        size: "M",
        stockQuantity: 10
      }
    });
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <motion.div 
        className="bg-[#232323] rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link href={`/product/${product.slug}`}>
          <div className="relative group">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                onClick={handleQuickView}
                className="bg-[hsl(184,100%,50%)] text-black py-2 px-6 font-bold uppercase text-sm tracking-wider transform -translate-y-4 group-hover:translate-y-0 transition-transform flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>
            
            {isNew && (
              <div className="absolute top-2 right-2 bg-[hsl(60,100%,50%)] text-black text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
            
            {isOnSale && (
              <div className="absolute top-2 left-2 bg-[hsl(320,100%,50%)] text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-bold mb-2">{product.name}</h3>
            <div className="flex justify-between items-center">
              <div>
                {isOnSale ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-[hsl(320,100%,50%)] font-bold">€{product.salePrice?.toFixed(2)}</span>
                    <span className="text-muted-foreground line-through text-sm">€{product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-[hsl(184,100%,50%)] font-bold">€{product.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex space-x-1">
                {colors.slice(0, 3).map((color, i) => (
                  <span 
                    key={i} 
                    className={`w-4 h-4 rounded-full cursor-pointer bg-${color.toLowerCase() === 'cyan' ? '[hsl(184,100%,50%)]' : 
                      color.toLowerCase() === 'magenta' ? '[hsl(320,100%,50%)]' : 
                      color.toLowerCase() === 'yellow' ? '[hsl(60,100%,50%)]' : 
                      color.toLowerCase()}`}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
      
      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>Quick preview of the product</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full rounded-md object-cover"
              />
            </div>
            
            <div>
              <div className="mb-4">
                {isOnSale ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[hsl(320,100%,50%)]">€{product.salePrice?.toFixed(2)}</span>
                    <span className="text-muted-foreground line-through">€{product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-[hsl(184,100%,50%)]">€{product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6">
                {product.description.length > 150 
                  ? `${product.description.slice(0, 150)}...` 
                  : product.description}
              </p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Color</h4>
                <div className="flex space-x-2">
                  {colors.slice(0, 3).map((color, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full cursor-pointer bg-${color.toLowerCase() === 'cyan' ? '[hsl(184,100%,50%)]' : 
                        color.toLowerCase() === 'magenta' ? '[hsl(320,100%,50%)]' : 
                        color.toLowerCase() === 'yellow' ? '[hsl(60,100%,50%)]' : 
                        color.toLowerCase()}`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Size</h4>
                <div className="flex space-x-2">
                  {["S", "M", "L"].map((size) => (
                    <Button 
                      key={size}
                      variant="outline" 
                      className="min-w-[40px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,40%)]"
                >
                  Add to Cart
                </Button>
                
                <Button asChild variant="outline">
                  <Link href={`/product/${product.slug}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
