import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, Package, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const [orderNumber] = useState(`SR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // standard shipping is 3-5 days
    return date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
  });

  // Animation for the checkmark
  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 }
    }
  };
  
  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { delay: 0.6, duration: 0.8, ease: "easeInOut" }
    }
  };

  const steps = [
    { 
      title: "Order Confirmed", 
      description: "Your order has been confirmed and is being processed.", 
      icon: Check,
      status: "completed"
    },
    { 
      title: "Order Processing", 
      description: "We're preparing your items for shipment.", 
      icon: Package,
      status: "in-progress"
    },
    { 
      title: "Shipped", 
      description: "Your order is on its way to you.", 
      icon: Truck,
      status: "pending"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Order Confirmation | Serotonin Styles</title>
        <meta name="description" content="Thank you for your order! Your purchase has been confirmed." />
      </Helmet>
      
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Success Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative h-24 w-24">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#990000]/10 flex items-center justify-center border border-[#990000]"
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <svg 
                    className="w-12 h-12 text-[#990000]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={checkVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
            
            {/* Order Confirmation */}
            <motion.div 
              className="bg-[#0a0a0a] rounded-lg border border-[#990000]/20 p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold gothic-text text-white mb-2">
                  <span className="text-[#990000]">Thanks for your order!</span>
                </h1>
                <p className="text-white/70">
                  We've received your order and we're getting it ready for you.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-md border border-white/10 mb-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium text-white">Order Details</h2>
                    <p className="text-white/70 text-sm">Order number: {orderNumber}</p>
                  </div>
                  <Link href="/account/orders" className="text-[#990000] hover:underline text-sm">
                    View all orders
                  </Link>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">Estimated delivery:</span>
                    <span className="text-white font-medium">{estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Email confirmation sent to:</span>
                    <span className="text-white">you@example.com</span>
                  </div>
                </div>
              </div>
              
              {/* Order tracking */}
              <div className="bg-black p-6 rounded-md border border-white/10 mb-6">
                <h2 className="text-lg font-medium text-white mb-4">Order Status</h2>
                
                <div className="relative">
                  {/* Progress bar */}
                  <div className="absolute left-5 top-0 w-[2px] h-full bg-white/20 z-0"></div>
                  
                  {/* Steps */}
                  <div className="space-y-8 relative z-10">
                    {steps.map((step, index) => (
                      <div key={index} className="flex">
                        <div className={`flex items-center justify-center h-10 w-10 rounded-full border-2 ${
                          step.status === 'completed' 
                            ? 'border-[#990000] bg-[#990000]' 
                            : step.status === 'in-progress'
                              ? 'border-[#990000] bg-[#990000]/20' 
                              : 'border-white/30 bg-black'
                        } mr-4 z-10`}>
                          <step.icon className={`h-5 w-5 ${
                            step.status === 'completed' ? 'text-white' : 
                            step.status === 'in-progress' ? 'text-[#990000]' : 'text-white/30'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            step.status === 'completed' || step.status === 'in-progress' 
                              ? 'text-white' 
                              : 'text-white/50'
                          }`}>
                            {step.title}
                          </h3>
                          <p className={`text-sm ${
                            step.status === 'completed' || step.status === 'in-progress' 
                              ? 'text-white/70' 
                              : 'text-white/30'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-white">
                  Need help? <Link href="/contact" className="text-[#990000] hover:underline">Contact support</Link>
                </p>
                
                <Button asChild className="bg-[#990000] hover:bg-[#990000]/80">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </motion.div>
            
            {/* Featured Products - you could add a "You might also like" section here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;