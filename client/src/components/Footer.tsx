import { Link } from "wouter";
import SmileyLogo from "./ui/smiley-logo";
import { 
  Facebook, 
  Instagram, 
  Music, 
  Twitch,
  Headphones,
  Zap,
  Heart,
  Mail,
  Globe
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-[#e60073]/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-bold text-2xl flex items-center mb-4 rave-glow">
              <SmileyLogo className="mr-2" size={28} />
              <span className="logo-text tracking-widest text-white">SEROTONIN</span>
            </Link>
            <p className="text-white/70 mb-6">
              Hard techno gear for the underground. Elevate your rave experience with our dark-inspired fashion.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-[#e60073] transition-colors bg-black/80 p-2 rounded-full border border-[#e60073]/30 hover:border-[#e60073]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-white/70 hover:text-[#e60073] transition-colors bg-black/80 p-2 rounded-full border border-[#e60073]/30 hover:border-[#e60073]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="text-white/70 hover:text-[#e60073] transition-colors bg-black/80 p-2 rounded-full border border-[#e60073]/30 hover:border-[#e60073]">
                <Twitch className="h-5 w-5" />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                className="text-white/70 hover:text-[#e60073] transition-colors bg-black/80 p-2 rounded-full border border-[#e60073]/30 hover:border-[#e60073]">
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-6 text-white gothic-text tracking-wider flex items-center gap-2">
              <Headphones className="h-4 w-4 text-[#e60073]" />
              SHOP SECTIONS
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/shop" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/new-arrivals" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  New Drops
                </Link>
              </li>
              <li>
                <Link href="/category/best-sellers" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Acid Favorites
                </Link>
              </li>
              <li>
                <Link href="/category/sale" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Afterparty Sale
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-6 text-white gothic-text tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#e60073]" />
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/customer-service" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-6 text-white gothic-text tracking-wider flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#e60073]" />
              OUR VIBE
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/our-story" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/festival-guide" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Underground Guide
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Join Our Rave
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e60073] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e60073] rounded-full"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-[#e60073]/30" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0 flex items-center">
            <Globe className="h-4 w-4 mr-2 text-[#e60073]" />
            © {new Date().getFullYear()} Serotonin Styles. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
            <Link href="/privacy-policy" className="hover:text-[#e60073] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#e60073] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#e60073] transition-colors">
              Cookies
            </Link>
            <div className="flex items-center space-x-3 ml-4">
              <div className="h-7 w-12 bg-gradient-to-r from-[#000] to-[#e60073]/80 rounded border border-white/20 flex items-center justify-center text-[10px]">VISA</div>
              <div className="h-7 w-12 bg-gradient-to-r from-[#000] to-[#e60073]/80 rounded border border-white/20 flex items-center justify-center text-[10px]">MC</div>
              <div className="h-7 w-12 bg-gradient-to-r from-[#000] to-[#e60073]/80 rounded border border-white/20 flex items-center justify-center text-[10px]">AMEX</div>
              <div className="h-7 w-12 bg-gradient-to-r from-[#000] to-[#e60073]/80 rounded border border-white/20 flex items-center justify-center text-[10px]">PAY</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;