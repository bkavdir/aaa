import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlayCircle, ExternalLink, Music } from "lucide-react";

const Home = () => {
  const { data: featuredProducts, isLoading: isLoadingFeatured } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  // Auto-rotation for featured products
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (featuredProducts && featuredProducts.length > 0) {
      autoRotateRef.current = setInterval(() => {
        setCurrentProductIndex(prevIndex => 
          prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Rotate every 5 seconds
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [featuredProducts]);

  const handleProductIndicatorClick = (index: number) => {
    setCurrentProductIndex(index);
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = setInterval(() => {
        setCurrentProductIndex(prevIndex => 
          prevIndex === (featuredProducts?.length || 0) - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  };

  // Spotify playlist section
  const playlists = [
    {
      name: "Berlin Underground",
      description: "The dark, hypnotic sounds of Berlin's most infamous clubs",
      image: "https://images.unsplash.com/photo-1571266028243-5e874fc5b3fe?q=80&w=800&auto=format&fit=crop",
      link: "https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675"
    },
    {
      name: "Hard Techno Essentials",
      description: "Pounding kick drums and distorted synths for the hardcore raver",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
      link: "https://open.spotify.com/playlist/37i9dQZF1DX0r3x8OtiwEM"
    },
    {
      name: "Warehouse Vibes",
      description: "Industrial sounds for industrial spaces",
      image: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?q=80&w=800&auto=format&fit=crop",
      link: "https://open.spotify.com/playlist/37i9dQZF1DX5wgKYQVRARv"
    }
  ];

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
        secondaryButtonText="First Drop"
        secondaryButtonLink="/shop"
      />
      
      {/* Our First Drop Section - Auto-Rotating Products */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold uppercase text-[#990000] gothic-text rave-glow">
              Our First Drop
            </h2>
            <Link href="/shop" className="uppercase text-sm font-bold tracking-wider text-[#990000] hover:underline">
              View All
            </Link>
          </div>
          
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 gap-6">
              <Skeleton className="h-[320px] w-full rounded-lg" />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                {/* Main product display */}
                <motion.div 
                  className="flex-1 relative rounded-lg overflow-hidden shadow-lg"
                  key={featuredProducts?.[currentProductIndex]?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {featuredProducts && featuredProducts.length > 0 && (
                    <Link href={`/product/${featuredProducts[currentProductIndex].slug}`}>
                      <div className="group cursor-pointer h-[320px] relative">
                        <img 
                          src={featuredProducts[currentProductIndex].images[0]} 
                          alt={featuredProducts[currentProductIndex].name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h3 className="text-xl font-bold gothic-text text-white mb-2">
                            {featuredProducts[currentProductIndex].name}
                          </h3>
                          <p className="text-gray-300 mb-3 text-sm">
                            {featuredProducts[currentProductIndex].description.slice(0, 80)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-white">
                                €{featuredProducts[currentProductIndex].salePrice || featuredProducts[currentProductIndex].price}
                              </span>
                              {featuredProducts[currentProductIndex].salePrice && (
                                <span className="text-sm line-through text-gray-400">
                                  €{featuredProducts[currentProductIndex].price}
                                </span>
                              )}
                            </div>
                            <Button size="sm" className="bg-[#990000] hover:bg-[#990000]/80">
                              Shop
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
                
                {/* Product indicators and thumbnails */}
                <div className="md:w-1/5 flex flex-row md:flex-col gap-2">
                  {featuredProducts?.slice(0, 4).map((product, index) => (
                    <button 
                      key={product.id}
                      onClick={() => handleProductIndicatorClick(index)}
                      className={`relative h-16 md:h-[75px] overflow-hidden rounded ${index === currentProductIndex ? 'ring-2 ring-[#990000]' : 'opacity-70'}`}
                      style={{ flex: '0 0 calc(25% - 6px)' }}
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      {index === currentProductIndex && (
                        <div className="absolute inset-0 bg-[#990000]/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Indicator dots for mobile */}
              <div className="flex justify-center mt-4 gap-2">
                {featuredProducts?.slice(0, 4).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleProductIndicatorClick(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentProductIndex ? 'bg-[#990000]' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Festival Collection Section */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold uppercase mb-2 text-[#990000] gothic-text rave-glow">
              Elevate Your Rave Experience
            </h2>
            <p className="text-gray-400 italic">Based in Dublin, Inspired by Berlin</p>
          </div>
          
          {/* Slowed down GIF section - typically this would be an actual GIF */}
          <div className="relative max-w-4xl mx-auto mb-12 overflow-hidden rounded-lg shadow-lg" style={{height: "200px"}}>
            <div className="absolute inset-0 bg-[#990000]/10 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1516016343867-2f608c783263?q=80&w=1200&auto=format&fit=crop')",
                animation: "slowPulse 8s infinite alternate", // This creates a slow-mo effect
              }}
            ></div>
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes slowPulse {
                  0% { transform: scale(1.0); opacity: 0.8; }
                  100% { transform: scale(1.05); opacity: 1; }
                }
              `
            }} />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <h3 className="text-3xl font-bold uppercase mb-2 text-white gothic-text rave-glow">Limited Edition</h3>
                <p className="text-white mb-4">Techno-inspired clothing for the darkest clubs</p>
                <Button className="bg-[#990000] hover:bg-[#990000]/80 text-white">
                  <Link href="/shop">Shop the Collection</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden h-96 group">
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Women's Festival Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold uppercase mb-3 text-white gothic-text">Women's Collection</h3>
                <p className="text-gray-300 mb-4 max-w-xs">Futuristic designs that glow under UV lights. Be the center of attention.</p>
                <Button asChild variant="outline" className="border-2 border-[#990000] text-[#990000] hover:bg-[#990000] hover:text-black">
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
                <h3 className="text-3xl font-bold uppercase mb-3 text-white gothic-text">Men's Collection</h3>
                <p className="text-gray-300 mb-4 max-w-xs">Technical fabrics with bold prints and reflective details designed for all-night comfort.</p>
                <Button asChild variant="outline" className="border-2 border-[#990000] text-[#990000] hover:bg-[#990000] hover:text-black">
                  <Link href="/category/mens">EXPLORE</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Playlists Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold uppercase text-[#990000] gothic-text rave-glow">
              Our Playlists
            </h2>
            <span className="text-sm font-medium text-gray-400">
              Sounds that inspired our collection
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playlists.map((playlist, index) => (
              <a 
                href={playlist.link} 
                target="_blank" 
                rel="noopener noreferrer"
                key={index} 
                className="group rounded-lg overflow-hidden bg-black/40 hover:bg-black/60 transition-colors"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={48} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white gothic-text">{playlist.name}</h3>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-[#990000] transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm">{playlist.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Music size={16} className="text-[#990000]" />
                    <span className="text-sm text-gray-300">Listen on Spotify</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Home;
