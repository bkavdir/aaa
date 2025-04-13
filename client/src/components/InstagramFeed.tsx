import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instagramImages = [
  "https://images.unsplash.com/photo-1516575150278-77992dd30abb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
];

// Colors for overlay
const overlayColors = [
  "bg-[hsl(320,100%,50%)]/30", // Magenta
  "bg-[hsl(184,100%,50%)]/30", // Cyan
  "bg-[hsl(60,100%,50%)]/30"   // Yellow
];

const InstagramFeed = () => {
  return (
    <section className="py-16 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold uppercase mb-3 text-[hsl(320,100%,50%)]">
            @SEROTONIA_STYLES
          </h2>
          <p className="text-muted-foreground">Tag us in your photos for a chance to be featured</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instagramImages.map((imageUrl, index) => (
            <motion.a 
              key={index}
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={imageUrl}
                alt="Instagram post" 
                className="w-full aspect-square object-cover"
              />
              <div className={`absolute inset-0 ${overlayColors[index % overlayColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                <Instagram className="text-white text-2xl" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
