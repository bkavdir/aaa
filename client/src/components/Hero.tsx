import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Headphones, Music } from "lucide-react";

interface HeroProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const Hero = ({
  imageUrl,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink
}: HeroProps) => {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={imageUrl} 
          alt="Rave Fashion" 
          className="object-cover w-full h-full opacity-40"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-[#e60073]/20 blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-[20%] w-48 h-48 rounded-full bg-[#00F5FF]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <motion.div 
            className="inline-block mb-6 p-2 px-4 border border-[#e60073] bg-black/50 rounded-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Headphones className="text-[#e60073] h-4 w-4" />
              <span className="text-white text-sm uppercase tracking-widest gothic-text">Hard Techno Gear</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-7xl font-bold uppercase mb-6 leading-tight text-white gothic-text tracking-wide rave-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title.split(' ').map((word, i) => {
              // Apply special color to specific words
              if (word.toLowerCase().includes("rave") || word.toLowerCase().includes("techno")) {
                return <span key={i} className="text-[#e60073] ml-2">{word}</span>;
              }
              return <span key={i} className="mr-2">{word}</span>;
            })}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              asChild
              size="lg"
              className="bg-[#e60073] text-white hover:bg-[#e60073]/80 gothic-text tracking-wider border border-[#e60073]/50 rave-glow"
            >
              <Link href={primaryButtonLink} className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {primaryButtonText}
              </Link>
            </Button>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border border-white/40 text-white hover:border-[#00F5FF] hover:text-[#00F5FF] gothic-text tracking-wider"
              >
                <Link href={secondaryButtonLink} className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  {secondaryButtonText}
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
