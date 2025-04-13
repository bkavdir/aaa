import { Helmet } from "react-helmet";
import { Ruler, Info, HelpCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const SizeGuide = () => {
  return (
    <>
      <Helmet>
        <title>Size Guide | Serotonin Styles</title>
        <meta name="description" content="Find your perfect fit with our comprehensive size guide for rave and techno clothing." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground">Size Guide</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <Ruler className="h-8 w-8 text-[hsl(60,100%,50%)] mr-3" />
            <h1 className="text-4xl font-bold">Size Guide</h1>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Finding the right size is essential for comfort on the dance floor. Our size guide will help you 
            find your perfect fit. All measurements are in centimeters. For the best fit, we recommend taking your 
            measurements over your underwear or with minimal clothing.
          </p>

          <div className="flex items-center p-4 bg-[#232323] rounded-lg mb-8">
            <Info className="h-5 w-5 text-[hsl(184,100%,50%)] mr-3 flex-shrink-0" />
            <p className="text-sm">
              Remember that our clothing is designed with dance and movement in mind. If you prefer a looser fit for more 
              freedom of movement, we recommend sizing up. For a more fitted look, stay true to size.
            </p>
          </div>
        </motion.div>

        {/* How to Measure */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[hsl(184,100%,50%)]">How to Measure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#232323] p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="h-6 w-6 rounded-full bg-[hsl(184,100%,50%)] text-black flex items-center justify-center mr-2 text-sm">1</span>
                Chest / Bust
              </h3>
              <p className="text-muted-foreground mb-4">
                Measure around the fullest part of your chest, keeping the measuring tape horizontal.
              </p>
              <div className="h-40 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
                  <path d="M16.39 15.56C14.71 14.7 13.53 13.28 13.09 11.5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2C13.5913 2 15.1174 2.42143 16.4223 3.21885C17.7271 4.01626 18.7580 5.15984 19.3787 6.52443C19.9993 7.88902 20.1837 9.4089 19.9135 10.8883C19.6432 12.3676 18.9308 13.7366 17.8662 14.8388C16.8015 15.9411 15.4329 16.7081 13.9343 17.0414C12.4358 17.3746 10.8735 17.2609 9.44301 16.7135C8.01252 16.1662 6.7829 15.2077 5.91331 13.962C5.04372 12.7163 4.57637 11.2401 4.57 9.73M4.59 7V3M4.59 3H8.59" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="bg-[#232323] p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="h-6 w-6 rounded-full bg-[hsl(320,100%,50%)] text-black flex items-center justify-center mr-2 text-sm">2</span>
                Waist
              </h3>
              <p className="text-muted-foreground mb-4">
                Measure around your natural waistline, keeping the tape comfortably loose.
              </p>
              <div className="h-40 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
                  <path d="M20.42 12.37C20.18 16.72 16.63 20.25 12.27 20.47C9.61 20.61 7.12 19.52 5.34 17.65C3.55 15.79 2.57 13.26 2.58 10.6C2.59 6.25 6.13 2.72 10.49 2.52C13.14 2.39 15.62 3.48 17.39 5.35C19.17 7.22 20.14 9.74 20.12 12.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="bg-[#232323] p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="h-6 w-6 rounded-full bg-[hsl(60,100%,50%)] text-black flex items-center justify-center mr-2 text-sm">3</span>
                Hips
              </h3>
              <p className="text-muted-foreground mb-4">
                Measure around the fullest part of your hips, approximately 8" below your waist.
              </p>
              <div className="h-40 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C14.5013 2 16.8912 3.00267 18.6438 4.75533C20.3965 6.50799 21.3991 8.8979 21.3991 11.3991C21.3991 13.9004 20.3965 16.2903 18.6438 18.0429C16.8912 19.7956 14.5013 20.7982 12 20.7982C9.49872 20.7982 7.1088 19.7956 5.35615 18.0429C3.60349 16.2903 2.60082 13.9004 2.60082 11.3991C2.60082 8.8979 3.60349 6.50799 5.35615 4.75533C7.1088 3.00267 9.49872 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15C8 17 10 18 12 18C14 18 16 17 18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Size Tables */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[hsl(320,100%,50%)]">Size Tables</h2>
          
          <div className="space-y-8">
            {/* Tops Size Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Tops & Bodysuits</h3>
              <div className="rounded-lg overflow-hidden border border-border">
                <Table>
                  <TableCaption>All measurements are in centimeters (cm)</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#232323]">Size</TableHead>
                      <TableHead className="bg-[#232323] text-center">XS</TableHead>
                      <TableHead className="bg-[#232323] text-center">S</TableHead>
                      <TableHead className="bg-[#232323] text-center">M</TableHead>
                      <TableHead className="bg-[#232323] text-center">L</TableHead>
                      <TableHead className="bg-[#232323] text-center">XL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">US / UK</TableCell>
                      <TableCell className="text-center">0-2</TableCell>
                      <TableCell className="text-center">4-6</TableCell>
                      <TableCell className="text-center">8-10</TableCell>
                      <TableCell className="text-center">12-14</TableCell>
                      <TableCell className="text-center">16-18</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">EU</TableCell>
                      <TableCell className="text-center">32-34</TableCell>
                      <TableCell className="text-center">36-38</TableCell>
                      <TableCell className="text-center">40-42</TableCell>
                      <TableCell className="text-center">44-46</TableCell>
                      <TableCell className="text-center">48-50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bust</TableCell>
                      <TableCell className="text-center">78-82</TableCell>
                      <TableCell className="text-center">83-87</TableCell>
                      <TableCell className="text-center">88-92</TableCell>
                      <TableCell className="text-center">93-97</TableCell>
                      <TableCell className="text-center">98-102</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Waist</TableCell>
                      <TableCell className="text-center">60-64</TableCell>
                      <TableCell className="text-center">65-69</TableCell>
                      <TableCell className="text-center">70-74</TableCell>
                      <TableCell className="text-center">75-79</TableCell>
                      <TableCell className="text-center">80-84</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hips</TableCell>
                      <TableCell className="text-center">85-89</TableCell>
                      <TableCell className="text-center">90-94</TableCell>
                      <TableCell className="text-center">95-99</TableCell>
                      <TableCell className="text-center">100-104</TableCell>
                      <TableCell className="text-center">105-109</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Bottoms Size Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Bottoms</h3>
              <div className="rounded-lg overflow-hidden border border-border">
                <Table>
                  <TableCaption>All measurements are in centimeters (cm)</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#232323]">Size</TableHead>
                      <TableHead className="bg-[#232323] text-center">XS</TableHead>
                      <TableHead className="bg-[#232323] text-center">S</TableHead>
                      <TableHead className="bg-[#232323] text-center">M</TableHead>
                      <TableHead className="bg-[#232323] text-center">L</TableHead>
                      <TableHead className="bg-[#232323] text-center">XL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">US / UK</TableCell>
                      <TableCell className="text-center">0-2</TableCell>
                      <TableCell className="text-center">4-6</TableCell>
                      <TableCell className="text-center">8-10</TableCell>
                      <TableCell className="text-center">12-14</TableCell>
                      <TableCell className="text-center">16-18</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">EU</TableCell>
                      <TableCell className="text-center">32-34</TableCell>
                      <TableCell className="text-center">36-38</TableCell>
                      <TableCell className="text-center">40-42</TableCell>
                      <TableCell className="text-center">44-46</TableCell>
                      <TableCell className="text-center">48-50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Waist</TableCell>
                      <TableCell className="text-center">60-64</TableCell>
                      <TableCell className="text-center">65-69</TableCell>
                      <TableCell className="text-center">70-74</TableCell>
                      <TableCell className="text-center">75-79</TableCell>
                      <TableCell className="text-center">80-84</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hips</TableCell>
                      <TableCell className="text-center">85-89</TableCell>
                      <TableCell className="text-center">90-94</TableCell>
                      <TableCell className="text-center">95-99</TableCell>
                      <TableCell className="text-center">100-104</TableCell>
                      <TableCell className="text-center">105-109</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Inseam (Regular)</TableCell>
                      <TableCell className="text-center">76</TableCell>
                      <TableCell className="text-center">77</TableCell>
                      <TableCell className="text-center">78</TableCell>
                      <TableCell className="text-center">79</TableCell>
                      <TableCell className="text-center">80</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[hsl(60,100%,50%)]">Frequently Asked Questions</h2>
          
          <div className="bg-[#232323] rounded-lg p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  How do I know which size is right for me?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We recommend taking your measurements and comparing them to our size charts. If you're between sizes, 
                  consider the fit you prefer (fitted or loose) and the fabric of the item. For stretchy fabrics, you might 
                  want to size down, while for more structured pieces, sizing up might be more comfortable.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Do your sizes run true to standard sizing?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our sizes generally run true to standard European sizing. However, some styles might fit differently 
                  based on the design. We include specific fit notes on product pages where necessary. If you're unsure, 
                  contact our customer service for advice on a specific item.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  What if my item doesn't fit?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  If your item doesn't fit, you can return it within 30 days of receipt for a refund or exchange, 
                  provided it's unworn with all original tags. Please see our Returns & Exchanges policy for complete details.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Are your measurements in inches or centimeters?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  All measurements in our size charts are in centimeters (cm). To convert to inches, divide by 2.54.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Do you offer custom sizing?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We don't currently offer custom sizing for our ready-to-wear collection. However, for special events or 
                  bulk orders, please contact our customer service team to discuss options.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>

        {/* Contact for Help */}
        <motion.div
          className="mt-12 p-8 bg-[#232323] rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-[hsl(184,100%,50%)]" />
          <h2 className="text-2xl font-bold mb-2">Need Help with Sizing?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Still unsure about which size to choose? Our customer service team is here to help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:support@serotoninstyles.com" className="inline-flex items-center justify-center bg-transparent border border-[hsl(184,100%,50%)] text-[hsl(184,100%,50%)] px-6 py-2 rounded-md hover:bg-[hsl(184,100%,50%)] hover:text-black transition-colors">
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </a>
            <a href="/contact" className="inline-flex items-center justify-center bg-transparent border border-[hsl(320,100%,50%)] text-[hsl(320,100%,50%)] px-6 py-2 rounded-md hover:bg-[hsl(320,100%,50%)] hover:text-black transition-colors">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SizeGuide;
