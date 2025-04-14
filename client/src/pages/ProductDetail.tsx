import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Product, ProductVariant } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

const ProductDetail = () => {
  const [match, params] = useRoute("/product/:slug");
  const slug = params?.slug || "";
  
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const { data: product, isLoading, error } = useQuery<ProductWithVariants>({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });
  
  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery<Product[]>({
    queryKey: ['/api/products', { limit: 4 }],
    enabled: !!product,
  });
  
  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };
  
  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      toast({
        title: "Please select options",
        description: "You need to select color and size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    // Find the selected variant
    const selectedVariant = product.variants.find(
      v => v.size === selectedSize
    );
    
    if (!selectedVariant) {
      toast({
        title: "Variant not available",
        description: "The selected combination is not available",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: 0, // Will be set by context
      userId: 1, // Demo user
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      createdAt: new Date(),
      product,
      variant: selectedVariant
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10" />
                ))}
              </div>
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  // Get unique sizes from variants
  const sizes = Array.from(new Set(product.variants.map(v => v.size)));
  
  // Check if a color-size combination is available
  const isVariantAvailable = (size: string) => {
    return product.variants.some(
      v => v.size === size && v.stockQuantity > 0
    );
  };
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Serotonin Styles</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground" asChild>
                <span>{product.name}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-[#232323] rounded-lg overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="mb-4">
              {product.salePrice ? (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-[hsl(320,100%,50%)]">€{product.salePrice.toFixed(2)}</span>
                  <span className="text-muted-foreground line-through">€{product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-[hsl(184,100%,50%)]">€{product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground mb-8">{product.description}</p>
            

            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Size: {selectedSize || "Select a size"}</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const isAvailable = isVariantAvailable(size);
                  
                  return (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      disabled={ !isAvailable}
                      className={`min-w-[40px] ${
                        selectedSize === size ? 'bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,45%)]' : ''
                      }`}
                    >
                      {size}
                    </Button>
                  );
                })}
              </div>
              <Link href="/size-guide" className="text-xs text-[hsl(184,100%,50%)] mt-2 inline-block">
                Size Guide
              </Link>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,45%)] hover:shadow-[0_0_10px_rgba(0,245,255,0.5)]"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            
            {/* Additional Features - Delivery Info, etc. */}
            <div className="mt-8 pt-8 border-t border-border">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                  <TabsTrigger value="returns" className="flex-1">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="py-4 text-sm text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Material: High-quality technical fabrics</li>
                      <li>Care: Machine wash cold, hang to dry</li>
                      <li>UV reactive: Colors pop under black light</li>
                      <li>Sustainably produced in limited quantities</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="shipping">
                  <div className="py-4 text-sm text-muted-foreground">
                    <p>Free standard shipping on all orders over €100. Orders typically ship within 1-2 business days.</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Standard Delivery: 3-5 business days (€5.99)</li>
                      <li>Express Delivery: 1-2 business days (€12.99)</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="returns">
                  <div className="py-4 text-sm text-muted-foreground">
                    <p>We accept returns within 30 days of delivery. Items must be unworn with original tags attached.</p>
                    <p className="mt-2">Refunds will be processed within 5-7 business days after we receive your return.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          
          {isLoadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts?.slice(0, 4)
                .filter(p => p.id !== product.id)
                .map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
