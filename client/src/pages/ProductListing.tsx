import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Filter, ChevronDown, X } from "lucide-react";
import { Product, Category } from "@shared/schema";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface FilterState {
  category: string | null;
  priceRange: [number, number] | null;
  colors: string[];
  sizes: string[];
  sort: string;
}

const ProductListing = () => {
  const [match, params] = useRoute("/category/:slug");
  const [, setLocation] = useLocation();
  const categorySlug = params?.slug || null;
  
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: categorySlug,
    priceRange: null,
    colors: [],
    sizes: [],
    sort: "newest",
  });
  
  // Get search query from URL if exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);
  
  // Reset category filter if URL changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categorySlug,
    }));
  }, [categorySlug]);
  
  const { data: allProducts, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  const { data: categoryData } = useQuery<Category>({
    queryKey: [`/api/categories/${categorySlug}`],
    enabled: !!categorySlug,
  });
  
  // Filter products based on filters and search
  const filteredProducts = allProducts?.filter(product => {
    // Filter by category
    if (filters.category && product.categoryId !== categories?.find(c => c.slug === filters.category)?.id) {
      return false;
    }
    
    // Filter by search query
    if (searchParams && searchParams.has("search")) {
      const searchQuery = searchParams.get("search")?.toLowerCase();
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery) && 
          !product.description.toLowerCase().includes(searchQuery)) {
        return false;
      }
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const productPrice = product.salePrice || product.price;
      if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
        return false;
      }
    }
    
    // Filter by colors - not implemented in backend, just UI demonstration
    if (filters.colors.length > 0) {
      // In a real implementation, we would check product variants
      // return filters.colors.some(color => product.variants.some(v => v.color === color));
    }
    
    // Filter by sizes - not implemented in backend, just UI demonstration
    if (filters.sizes.length > 0) {
      // In a real implementation, we would check product variants
      // return filters.sizes.some(size => product.variants.some(v => v.size === size));
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-desc":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });
  
  const handleColorFilterChange = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }));
  };
  
  const handleSizeFilterChange = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };
  
  const handleCategoryChange = (slug: string | null) => {
    setFilters(prev => ({
      ...prev,
      category: slug === "all" ? null : slug,
    }));
    
    if (slug && slug !== "all") {
      setLocation(`/category/${slug}`);
    } else {
      setLocation("/shop");
    }
  };
  
  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sort: value,
    }));
  };
  
  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max],
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      category: categorySlug,
      priceRange: null,
      colors: [],
      sizes: [],
      sort: "newest",
    });
  };
  
  const pageTitle = categoryData 
    ? `${categoryData.name} | Serotonin Styles` 
    : searchParams?.has("search")
      ? `Search: ${searchParams.get("search")} | Serotonin Styles`
      : "Shop All | Serotonin Styles";
  
  const pageDescription = categoryData
    ? categoryData.description || "Explore our collection of rave and techno wear."
    : "Discover our complete collection of rave and techno clothing designed for the ultimate nightlife experience.";
  
  // Available color options
  const colorOptions = [
    { value: "Cyan", label: "Cyan", class: "bg-[hsl(184,100%,50%)]" },
    { value: "Magenta", label: "Magenta", class: "bg-[hsl(320,100%,50%)]" },
    { value: "Yellow", label: "Yellow", class: "bg-[hsl(60,100%,50%)]" },
    { value: "Black", label: "Black", class: "bg-black" },
    { value: "White", label: "White", class: "bg-white" },
    { value: "Silver", label: "Silver", class: "bg-gray-300" },
  ];
  
  // Available size options
  const sizeOptions = ["XS", "S", "M", "L", "XL"];
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            {categoryData && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-muted-foreground">
                    {categoryData.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {searchParams?.has("search") && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-muted-foreground">
                    Search: {searchParams.get("search")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Page Title & Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {categoryData ? categoryData.name : searchParams?.has("search") ? `Search: ${searchParams.get("search")}` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {pageDescription}
          </p>
        </div>
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              
              <div className="py-4">
                <Accordion type="single" collapsible className="w-full" defaultValue="category">
                  {/* Categories */}
                  <AccordionItem value="category">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="all-categories-mobile" 
                            checked={!filters.category}
                            onCheckedChange={() => handleCategoryChange(null)}
                          />
                          <Label htmlFor="all-categories-mobile">All Products</Label>
                        </div>
                        
                        {isLoadingCategories ? (
                          <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                              <Skeleton key={i} className="h-5 w-full" />
                            ))}
                          </div>
                        ) : (
                          categories?.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.slug}-mobile`} 
                                checked={filters.category === category.slug}
                                onCheckedChange={() => handleCategoryChange(category.slug)}
                              />
                              <Label htmlFor={`category-${category.slug}-mobile`}>{category.name}</Label>
                            </div>
                          ))
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price Range */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="min-price-mobile">Min Price</Label>
                            <Input 
                              type="number" 
                              id="min-price-mobile" 
                              placeholder="0" 
                              min="0"
                              value={filters.priceRange?.[0] || ""}
                              onChange={(e) => {
                                const min = parseInt(e.target.value) || 0;
                                const max = filters.priceRange?.[1] || 1000;
                                handlePriceRangeChange(min, max);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor="max-price-mobile">Max Price</Label>
                            <Input 
                              type="number" 
                              id="max-price-mobile" 
                              placeholder="1000" 
                              min="0"
                              value={filters.priceRange?.[1] || ""}
                              onChange={(e) => {
                                const max = parseInt(e.target.value) || 1000;
                                const min = filters.priceRange?.[0] || 0;
                                handlePriceRangeChange(min, max);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, priceRange: null }))}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Colors */}
                  <AccordionItem value="colors">
                    <AccordionTrigger>Colors</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2">
                        {colorOptions.map(color => (
                          <div 
                            key={color.value} 
                            className={`flex flex-col items-center space-y-1 cursor-pointer`}
                            onClick={() => handleColorFilterChange(color.value)}
                          >
                            <div 
                              className={`w-8 h-8 rounded-full ${color.class} ${
                                color.value === "White" ? "border border-gray-300" : ""
                              } ${filters.colors.includes(color.value) ? "ring-2 ring-[hsl(184,100%,50%)] ring-offset-2 ring-offset-background" : ""}`}
                            />
                            <span className="text-xs">{color.label}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Sizes */}
                  <AccordionItem value="sizes">
                    <AccordionTrigger>Sizes</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {sizeOptions.map(size => (
                          <Button
                            key={size}
                            variant={filters.sizes.includes(size) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleSizeFilterChange(size)}
                            className={filters.sizes.includes(size) ? "bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,45%)]" : ""}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <SheetFooter>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex space-x-4 items-center">
            {/* Category Dropdown */}
            <Select 
              value={filters.category || ""} 
              onValueChange={(value) => handleCategoryChange(value || null)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map(category => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                placeholder="Min €" 
                className="w-[100px]"
                value={filters.priceRange?.[0] || ""}
                onChange={(e) => {
                  const min = parseInt(e.target.value) || 0;
                  const max = filters.priceRange?.[1] || 1000;
                  handlePriceRangeChange(min, max);
                }}
              />
              <span>-</span>
              <Input 
                type="number" 
                placeholder="Max €" 
                className="w-[100px]"
                value={filters.priceRange?.[1] || ""}
                onChange={(e) => {
                  const max = parseInt(e.target.value) || 1000;
                  const min = filters.priceRange?.[0] || 0;
                  handlePriceRangeChange(min, max);
                }}
              />
            </div>
            
            {/* Color filters */}
            <div className="flex items-center space-x-1">
              {colorOptions.slice(0, 6).map(color => (
                <div 
                  key={color.value}
                  className={`w-6 h-6 rounded-full ${color.class} cursor-pointer ${
                    color.value === "White" ? "border border-gray-300" : ""
                  } ${filters.colors.includes(color.value) ? "ring-1 ring-[hsl(184,100%,50%)] ring-offset-1 ring-offset-background" : ""}`}
                  title={color.label}
                  onClick={() => handleColorFilterChange(color.value)}
                />
              ))}
            </div>
            
            {/* Size filters */}
            <div className="flex items-center space-x-1">
              {sizeOptions.map(size => (
                <Button
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSizeFilterChange(size)}
                  className={`min-w-[32px] h-8 px-2 ${
                    filters.sizes.includes(size) ? "bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,45%)]" : ""
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
            
            {/* Clear filters */}
            {(filters.priceRange || filters.colors.length > 0 || filters.sizes.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-[hsl(320,100%,50%)] hover:text-[hsl(320,100%,40%)] hover:bg-[hsl(320,100%,50%)]/10"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
          
          {/* Sort Dropdown */}
          <Select value={filters.sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Active Filters Display */}
        {(filters.colors.length > 0 || filters.sizes.length > 0 || filters.priceRange) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active Filters:</span>
            
            {filters.priceRange && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilters(prev => ({ ...prev, priceRange: null }))}
                className="h-7 gap-1 text-xs"
              >
                €{filters.priceRange[0]} - €{filters.priceRange[1]}
                <X className="h-3 w-3" />
              </Button>
            )}
            
            {filters.colors.map(color => (
              <Button 
                key={color}
                variant="outline" 
                size="sm" 
                onClick={() => handleColorFilterChange(color)}
                className="h-7 gap-1 text-xs"
              >
                {color}
                <X className="h-3 w-3" />
              </Button>
            ))}
            
            {filters.sizes.map(size => (
              <Button 
                key={size}
                variant="outline" 
                size="sm" 
                onClick={() => handleSizeFilterChange(size)}
                className="h-7 gap-1 text-xs"
              >
                Size: {size}
                <X className="h-3 w-3" />
              </Button>
            ))}
          </div>
        )}
        
        {/* Product Grid */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="h-80 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts?.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-4">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query to find what you're looking for.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {sortedProducts?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ProductListing;
