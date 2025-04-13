import { Link } from "wouter";
import SmileyLogo from "./ui/smiley-logo";
import { 
  Facebook, 
  Instagram, 
  Music, 
  Twitch
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] py-16 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-bold text-2xl flex items-center mb-4">
              <SmileyLogo className="text-[hsl(60,100%,50%)] mr-2" size={24} />
              <span className="font-mono tracking-tight">SEROTONIN</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Elevate your rave experience with our techno-inspired fashion and accessories.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-[hsl(184,100%,50%)] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[hsl(320,100%,50%)] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[hsl(60,100%,50%)] transition-colors">
                <Twitch className="h-5 w-5" />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[hsl(184,100%,50%)] transition-colors">
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-4">Shop</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-[hsl(184,100%,50%)] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/new-arrivals" className="hover:text-[hsl(184,100%,50%)] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/category/best-sellers" className="hover:text-[hsl(184,100%,50%)] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/category/sale" className="hover:text-[hsl(184,100%,50%)] transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:text-[hsl(184,100%,50%)] transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-4">Help</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/customer-service" className="hover:text-[hsl(320,100%,50%)] transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[hsl(320,100%,50%)] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[hsl(320,100%,50%)] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[hsl(320,100%,50%)] transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-[hsl(320,100%,50%)] transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-4">About</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/our-story" className="hover:text-[hsl(60,100%,50%)] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-[hsl(60,100%,50%)] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/festival-guide" className="hover:text-[hsl(60,100%,50%)] transition-colors">
                  Festival Guide
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[hsl(60,100%,50%)] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[hsl(60,100%,50%)] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-border/40" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Serotonin Styles. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
            <div className="flex items-center space-x-2">
              <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10,16V8H8V16H10M16,16V8H14V16H16M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4Z" />
              </svg>
              <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
              </svg>
              <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M8.38,10.74C7.52,10.74 6.83,10.3 6.83,9.41C6.83,8.6 7.52,8.12 8.38,8.12C9.25,8.12 9.94,8.6 9.94,9.41C9.94,10.3 9.25,10.74 8.38,10.74M12,17.75H7.88V16.04H12V17.75M16.94,17.75H13.94V16.04H16.94V17.75M16.94,14.89H7.88V13.18H16.94V14.89M16.94,12H7.88V10.29H16.94V12Z" />
              </svg>
              <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.21,9L12.83,2.44C12.64,2.16 12.32,2.02 12,2.02C11.68,2.02 11.36,2.16 11.17,2.45L6.79,9H2C1.45,9 1,9.45 1,10C1,10.09 1.01,10.18 1.04,10.27L3.58,19.54C3.81,20.38 4.58,21 5.5,21H18.5C19.42,21 20.19,20.38 20.43,19.54L22.96,10.27L23,10C23,9.45 22.55,9 22,9H17.21M12,4.8L14.8,9H9.2L12,4.8M12,18.2C10.76,18.2 9.8,17.15 9.8,15.9C9.8,14.65 10.76,13.6 12,13.6C13.24,13.6 14.2,14.65 14.2,15.9C14.2,17.15 13.24,18.2 12,18.2Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
