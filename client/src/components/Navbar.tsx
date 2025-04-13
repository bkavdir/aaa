import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, User, X } from "lucide-react";
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
    { name: "New Arrivals", path: "/category/new-arrivals" },
    { name: "Rave Wear", path: "/category/rave-tops" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Sale", path: "/category/sale" },
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
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40">
      <div className="container mx-auto px-4">
        {/* Announcement Bar */}
        <div className="hidden md:flex justify-center py-2 text-muted-foreground text-sm">
          <span>FREE SHIPPING ON ORDERS OVER €100</span>
        </div>
        
        <div className="flex justify-between items-center py-3">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="font-bold text-2xl md:text-3xl flex items-center">
              <SmileyLogo className="text-[hsl(60,100%,50%)] mr-2" size={28} />
              <span className="hidden md:inline font-mono tracking-tight">SEROTONIN STYLES</span>
              <span className="md:hidden font-mono tracking-tight">SEROTONIN</span>
            </div>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 uppercase text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-foreground hover:text-[hsl(184,100%,50%)] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearchBar}>
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4">Account</h3>
                  <p className="text-muted-foreground mb-4">Sign in to view orders and manage your account</p>
                  <div className="space-y-2">
                    <Button className="w-full">Sign In</Button>
                    <Button variant="outline" className="w-full">Create Account</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="ghost" size="icon" onClick={toggleCart}>
              <CartIcon itemCount={totalItems} />
            </Button>
          </div>
        </div>
        
        {/* Search Bar - Conditional */}
        {showSearch && (
          <div className="py-3 border-t border-border/40">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="search"
                name="search"
                placeholder="Search products..."
                className="flex-grow"
                autoFocus
              />
              <Button type="submit" variant="ghost" className="ml-2">
                <Search className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" onClick={toggleSearchBar}>
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile Menu - Slide Down */}
      {showMobileMenu && (
        <nav className="bg-background border-t border-border/40 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4 uppercase text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="block py-2 text-foreground hover:text-[hsl(184,100%,50%)]"
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
