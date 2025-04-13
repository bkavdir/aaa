import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { data: newArrivals, isLoading: isLoadingNew } = useQuery<Product[]>({
    queryKey: ["/api/products", { newArrivals: true }],
  });

  const { data: featuredProducts, isLoading: isLoadingFeatured } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  return (
    <>
      <Helmet>
        <title>Serotonin Styles | Rave & Techno Fashion</title>
        <meta name="description" content="Elevate your rave experience with Serotonin Styles - premium techno and rave wear for the ultimate night out." />
      </Helmet>

      <Hero 
        imageUrl="https://images.unsplash.com/photo-1558613326-98ee8413e755?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        title="Elevate Your Rave Experience"
        subtitle="Discover our new collection of techno and rave wear designed for the ultimate night out."
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop"
        secondaryButtonText="New Arrivals"
        secondaryButtonLink="/category/new-arrivals"
      />
      
      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center uppercase mb-12 text-[hsl(184,100%,50%)]">
            Shop By Category
          </h2>
          
          <CategoryGrid />
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold uppercase text-[hsl(320,100%,50%)]">
              New Arrivals
            </h2>
            <Link href="/category/new-arrivals" className="uppercase text-sm font-bold tracking-wider text-[hsl(320,100%,50%)] hover:underline">
              View All
            </Link>
          </div>
          
          {isLoadingNew ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="h-80 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals?.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Festival Collection Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center uppercase mb-12 text-[hsl(60,100%,50%)]">
            Festival Season Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden h-96 group">
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Women's Festival Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold uppercase mb-3 text-white">Women's Collection</h3>
                <p className="text-gray-300 mb-4 max-w-xs">Futuristic designs that glow under UV lights. Be the center of attention.</p>
                <Button asChild variant="outline" className="border-2 border-[hsl(60,100%,50%)] text-[hsl(60,100%,50%)] hover:bg-[hsl(60,100%,50%)] hover:text-black">
                  <Link href="/category/womens">EXPLORE</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-96 group">
              <img 
                src="https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Men's Festival Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold uppercase mb-3 text-white">Men's Collection</h3>
                <p className="text-gray-300 mb-4 max-w-xs">Technical fabrics with bold prints and reflective details designed for all-night comfort.</p>
                <Button asChild variant="outline" className="border-2 border-[hsl(184,100%,50%)] text-[hsl(184,100%,50%)] hover:bg-[hsl(184,100%,50%)] hover:text-black">
                  <Link href="/category/mens">EXPLORE</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold uppercase text-[hsl(184,100%,50%)]">
              Featured Products
            </h2>
            <Link href="/shop" className="uppercase text-sm font-bold tracking-wider text-[hsl(184,100%,50%)] hover:underline">
              View All
            </Link>
          </div>
          
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="h-80 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <InstagramFeed />
      
      <Newsletter />
    </>
  );
};

export default Home;
