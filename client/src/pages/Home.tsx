import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";
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
  const [isHoveringCollection, setIsHoveringCollection] = useState(false);
  const collectionScrollRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect
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
  
  // Auto-scrolling effect for horizontal product collection
  useEffect(() => {
    const scrollContainer = collectionScrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.25; // pixels per frame

    const scroll = () => {
      if (!scrollContainer || isHoveringCollection) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching the end
      if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const animationFrame = () => {
      scroll();
      requestAnimationFrame(animationFrame);
    };

    // Start the animation
    const animationId = requestAnimationFrame(animationFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHoveringCollection]);

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
      image: "https://miro.medium.com/v2/resize:fit:1024/1*XZnX_9GwURSpGTjwBgmLZg.png",
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
      description: "Industrial sounds for industrial spaces, unleash yourself",
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
        imageUrl="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExajE1aGJ4cWQ5Ym12dXlicTh6a3d6cGpiN2NqMnN6djFibDBvZmYyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dn9McpMC10Mik/giphy.gif"
        title="Elevate Your Rave Experience"
        subtitle="From concept to reality, every piece is crafted with passion for the underground community."
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop"
      />
      
      {/* Our First Drop Section - New Design */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">

          
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 gap-6">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          ) : (
            <>
              
                            {/* Limited Edition Banner */}
                            <div className="relative overflow-hidden rounded-lg shadow-lg mb-10 max-w-full mx-auto">
                <div className="absolute inset-0 bg-[#990000]/10 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images-prod.dazeddigital.com/1800/azure/dazed-prod/1310/4/1314332.jpg')",
                    animation: "slowPulse 8s infinite alternate", // This creates a slow-mo effect
                  }}
                ></div>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes slowPulse {
                      0% { transform: scale(1.0); opacity: 0.8; }
                      100% { transform: scale(1.05); opacity: 1; }
                    }
                    @keyframes subtleGlow {
                      0% { text-shadow: 0 0 2px #990000, 0 0 3px #990000; }
                      50% { text-shadow: 0 0 4px #990000, 0 0 6px #990000; }
                      100% { text-shadow: 0 0 2px #990000, 0 0 3px #990000; }
                    }
                  `
                }} />
                <div className="relative h-64 flex items-center justify-center z-20 px-4">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold uppercase mb-2 text-white gothic-text" style={{ animation: "subtleGlow 4s infinite" }}>
                      Limited Edition Collection
                    </h3>
                    <p className="text-red mb-4 max-w-lg mx-auto">
                    Discover our new collection of techno and rave wear designed for the ultimate night out.
                    </p>
                    <Button className="bg-[#990000] hover:bg-[#990000]/80 text-white border border-[#990000]/30">
                      <Link href="/shop">Shop Limited Edition</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Horizontal Sliding Collection */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-5">
                </div>
                
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                    .no-scrollbar {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `
                }} />
                
                <div 
                  ref={collectionScrollRef}
                  className="overflow-x-auto no-scrollbar pb-6"
                  onMouseEnter={() => setIsHoveringCollection(true)}
                  onMouseLeave={() => setIsHoveringCollection(false)}
                >
                  <div className="flex gap-4" style={{ width: 'max-content', minWidth: '100%' }}>
                    {featuredProducts?.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="w-64 flex-shrink-0 relative group"
                      >
                        <Link href={`/product/${product.slug}`}>
                          <div className="rounded-lg overflow-hidden bg-[#0a0a0a] shadow-sm hover:shadow-[0_0_10px_rgba(153,0,0,0.15)] transition-all duration-300">
                            <div className="h-64 relative overflow-hidden">
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80"></div>
                              
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                  <Button size="sm" className="w-full bg-[#990000] hover:bg-[#990000]/80 text-white border border-[#990000]/20">
                                    Shop Now
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Product Info */}
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h3 className="text-white gothic-text font-bold truncate">{product.name}</h3>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-white font-medium">
                                    €{product.salePrice || product.price}
                                  </span>
                                  {product.salePrice && (
                                    <span className="text-xs line-through text-gray-400">
                                      €{product.price}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                

              </div>
              



            </>
          )}
        </div>
      </section>
      
      {/* Our Journey & Fabrics Section */}
      <section className="py-16 bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold uppercase mb-2 text-[#990000] gothic-text">
                <span className="relative inline-block">
                  Our Journey
                  <span className="absolute -inset-1 bg-[#990000]/5 blur-md rounded-full"></span>
                </span>
              </h2>
              <p className="text-gray-400 italic mb-1">Based in Dublin, Inspired by Berlin</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 gothic-text">From Underground to Wardrobe</h3>
                <p className="text-gray-300 mb-4">Born from the dark rooms of techno scene, our collection represents the intersection of avant-garde fashion and club functionality. Each piece tells a story of late nights, pulsing beats, and the raw energy that drives the underground.</p>
                <p className="text-gray-300">We're committed to creating clothing that enhances your experience, whether you're dancing until dawn or expressing your connection to the culture. Thank you for being part of our community.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4 gothic-text">Premium Materials</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-3 w-3 rounded-full bg-[#990000] mt-1.5 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">Reflective Tech Fabrics</h4>
                      <p className="text-gray-300 text-sm">High-visibility materials that react to light, perfect for making a statement in dark club environments.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-3 w-3 rounded-full bg-[#990000] mt-1.5 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">Performance Mesh</h4>
                      <p className="text-gray-300 text-sm">Breathable, stretch materials designed for all-night comfort and movement.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-3 w-3 rounded-full bg-[#990000] mt-1.5 mr-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">UV-Reactive Treatments</h4>
                      <p className="text-gray-300 text-sm">Special dyes and prints that transform under club lighting for a dynamic look.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Playlists Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold uppercase mb-2 text-[#990000] gothic-text">
              <span className="relative inline-block">
                Our Playlists
                <span className="absolute -inset-1 bg-[#990000]/5 blur-md rounded-full"></span>
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The sounds that inspired our collection. Dark, hypnotic beats from the underground.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {playlists.map((playlist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a 
                  href={playlist.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block rounded-lg overflow-hidden bg-[#0a0a0a] hover:shadow-[0_0_10px_rgba(153,0,0,0.15)] transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-[#990000]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300">
                        <PlayCircle size={36} className="text-white" style={{ filter: 'drop-shadow(0 0 2px #990000)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-white gothic-text" style={{ textShadow: '0 0 1px #990000' }}>
                        {playlist.name}
                      </h3>
                      <ExternalLink size={16} className="text-[#990000]" />
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{playlist.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#990000]"></div>
                      <span className="text-xs text-gray-300">Spotify</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section */}
      <InstagramFeed />
      
      <Newsletter />
    </>
  );
};

export default Home;
