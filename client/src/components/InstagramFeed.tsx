import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const instagramImages = [
  "https://images.unsplash.com/photo-1516575150278-77992dd30abb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1541971740285-192f53dc7a34?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1540331547168-8b63109225b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
];

// Feed information
const instagramPosts = instagramImages.map((image, index) => ({
  id: `post-${index}`,
  imageUrl: image,
  caption: index % 2 === 0 ? "#technoscene #ravewear #berlin" : "#underground #hardtechno #dublinrave",
  likes: Math.floor(Math.random() * 500) + 100,
}));

const InstagramFeed = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout | null = null;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!scrollContainer || isHovering) return;
      
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
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isHovering]);

  return (
    <section className="py-16 bg-black border-b border-[#990000]/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold uppercase mb-3 text-[#990000] gothic-text">
            <span className="relative inline-block">
              Instagram
              <span className="absolute -inset-1 bg-[#990000]/5 blur-md rounded-full"></span>
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Instagram className="text-[#990000] h-4 w-4" />
            <p className="text-gray-400">@SEROTONIN_STYLES</p>
          </div>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm">
            Crafted for the darkest clubs. Tag us for a chance to be featured.
          </p>
        </div>
        
        {/* Sideways sliding container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-6 no-scrollbar"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex gap-4" style={{ width: 'max-content', minWidth: '100%' }}>
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-60 flex-shrink-0 relative group"
              >
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="overflow-hidden rounded-lg shadow-md relative">
                    <img 
                      src={post.imageUrl}
                      alt="Instagram post" 
                      className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white flex flex-col items-center gap-2">
                        <Instagram className="h-8 w-8" style={{ filter: 'drop-shadow(0 0 2px #990000)' }} />
                        <span className="text-sm font-medium" style={{ textShadow: '0 0 1px #990000' }}>View Post</span>
                      </div>
                    </div>
                    
                    {/* Caption Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                      <p className="text-gray-200 text-xs">{post.caption}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white text-xs">{post.likes} likes</span>
                        <ExternalLink size={12} className="text-[#990000]" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* About Our Brand/Journey - Integrated into Instagram section */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#0a0a0a] p-6 rounded-lg border border-[#990000]/10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-[#990000]/5 mx-auto flex items-center justify-center">
                  <span className="text-5xl gothic-text text-white" style={{ textShadow: '0 0 3px #990000' }}>S</span>
                </div>
                <div className="absolute -inset-1 bg-[#990000]/5 blur-lg rounded-full z-0"></div>
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-2 gothic-text">From Underground to Wardrobe</h3>
              <p className="text-gray-300 text-sm mb-3">Born from the dark rooms of Berlin's techno scene, our collection represents the intersection of avant-garde fashion and club functionality. Each piece is crafted with technical fabrics that enhance your rave experience.</p>
              <p className="text-gray-400 text-xs">Based in Dublin, Inspired by Berlin</p>
            </div>
          </div>
        </div>
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
    </section>
  );
};

export default InstagramFeed;
