import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, User, X, Music, Zap } from "lucide-react";
import SmileyLogo from "./ui/smiley-logo";
import CartIcon from "./ui/cart-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [, setLocation] = useLocation();
  const { cartItems, toggleCart } = useCart();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop All", path: "/shop" },
    { name: "New Drops", path: "/category/new-arrivals" },
    { name: "Hard Techno", path: "/category/rave-tops" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Afterparty", path: "/category/sale" },
    { name: "Contact", path: "/contact" }
  ];

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchQuery = formData.get("search") as string;
    
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-[#e60000]/40">
      <div className="container mx-auto px-4">
        {/* Announcement Bar */}
        <div className="hidden md:flex justify-center py-2 text-white/70 text-sm rave-glow">
          <Zap className="h-4 w-4 mr-2" />
          <span className="gothic-text uppercase tracking-wider">Free Shipping On Orders Over €100</span>
          <Zap className="h-4 w-4 ml-2" />
        </div>
        
        <div className="flex justify-between items-center py-3">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="hover:bg-[#e60000]/20">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="font-bold text-2xl md:text-3xl flex items-center">
              <SmileyLogo className="mr-2" size={32} />
              <span className="hidden md:inline logo-text tracking-widest text-white rave-glow">SEROTONIN STYLES</span>
              <span className="md:hidden logo-text tracking-widest text-white rave-glow">SEROTONIN</span>
            </div>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 uppercase text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="nav-link text-white hover:text-[#e60000] transition-colors duration-200 tracking-wider"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearchBar} className="hover:bg-[#e60000]/20">
              <Search className="h-5 w-5 text-white" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-[#e60000]/20">
                  <User className="h-5 w-5 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black border-l border-[#e60000]/40">
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4 gothic-text text-white">Your Vibe</h3>
                  <p className="text-white/70 mb-4">Sign in to view orders and manage your account</p>
                  <div className="space-y-2">
                    <Button className="w-full bg-[#e60000] hover:bg-[#e60000]/80">Sign In</Button>
                    <Button variant="outline" className="w-full border-[#e60000]/40 text-white hover:bg-[#e60000]/20">Create Account</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="ghost" size="icon" onClick={toggleCart} className="hover:bg-[#e60000]/20">
              <CartIcon itemCount={totalItems} className="text-white" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar - Conditional */}
        {showSearch && (
          <div className="py-3 border-t border-[#e60000]/40">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="search"
                name="search"
                placeholder="Search products..."
                className="flex-grow bg-black/50 border-[#e60000]/40 text-white"
                autoFocus
              />
              <Button type="submit" variant="ghost" className="ml-2 text-white hover:bg-[#e60000]/20">
                <Search className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" onClick={toggleSearchBar} className="text-white hover:bg-[#e60000]/20">
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile Menu - Slide Down */}
      {showMobileMenu && (
        <nav className="bg-black border-t border-[#e60000]/40 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4 uppercase text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="nav-link block py-2 text-white hover:text-[#e60000] tracking-wider"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
