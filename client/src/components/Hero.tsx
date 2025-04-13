import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={imageUrl} 
          alt="Rave Fashion" 
          className="object-cover w-full h-full opacity-70"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold uppercase mb-4 leading-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title.split(' ').map((word, i) => {
              // Apply special color to specific words (like "Rave")
              if (word === "Rave") {
                return <span key={i} className="text-[hsl(320,100%,50%)] ml-2">{word}</span>;
              }
              return <span key={i} className="mr-2">{word}</span>;
            })}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-8"
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
              className="bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,40%)] hover:shadow-[0_0_20px_rgba(0,245,255,0.7)]"
            >
              <Link href={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-white hover:border-[hsl(60,100%,50%)] hover:text-[hsl(60,100%,50%)]"
              >
                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
