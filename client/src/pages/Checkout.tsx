import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Check, CreditCard, Package, ShoppingBag, Truck, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Form schema
const checkoutFormSchema = z.object({
  // Contact information
  email: z.string().email({ message: "Please enter a valid email address" }),
  // Shipping information
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address1: z.string().min(1, { message: "Address is required" }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  // Shipping method
  shippingMethod: z.enum(["standard", "express"]),
  // Payment method
  paymentMethod: z.enum(["card", "paypal", "afterpay"]),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"information" | "shipping" | "payment" | "review">("information");
  const [orderProcessing, setOrderProcessing] = useState(false);

  // Form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      postalCode: "",
      phone: "",
      shippingMethod: "standard",
      paymentMethod: "card",
    },
  });
  
  const watchShippingMethod = form.watch("shippingMethod");
  const shippingCost = watchShippingMethod === "express" ? 12.99 : 5.99;
  const total = cartTotal + shippingCost;
  
  const isShippingFree = cartTotal >= 100;
  const finalTotal = isShippingFree ? cartTotal : total;
  
  const onSubmit = async (data: CheckoutFormValues) => {
    if (checkoutStep === "information") {
      setCheckoutStep("shipping");
    } else if (checkoutStep === "shipping") {
      setCheckoutStep("payment");
    } else if (checkoutStep === "payment") {
      setCheckoutStep("review");
    } else {
      // Submit the order
      setOrderProcessing(true);
      
      // Simulate order processing
      setTimeout(() => {
        setOrderProcessing(false);
        // Clear the cart
        clearCart();
        // Show success message
        toast({
          title: "Order Placed Successfully",
          description: "Thank you for your purchase! Your order has been received.",
        });
        // Redirect to the confirmation page
        setLocation("/order-confirmation");
      }, 2000);
    }
  };
  
  // Step indicator
  const steps = [
    { id: "information", label: "Information", icon: User },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: Check },
  ];
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-black p-8 rounded-lg border border-[#990000]/10">
          <ShoppingBag className="h-16 w-16 mx-auto text-[#990000] mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-white gothic-text">Your Cart is Empty</h1>
          <p className="text-white/70 mb-6">
            You don't have any items in your cart to checkout.
          </p>
          <Button asChild className="bg-[#990000] hover:bg-[#990000]/80">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout | Serotonin Styles</title>
        <meta name="description" content="Complete your order with Serotonin Styles" />
      </Helmet>
      
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold gothic-text text-white">
              <span className="text-[#990000]">Checkout</span>
            </h1>
            <Link href="/shop" className="text-white/70 hover:text-white text-sm flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
          
          {/* Step indicator */}
          <div className="mb-12">
            <div className="flex justify-between w-full max-w-3xl mx-auto">
              {steps.map((step, index) => {
                const isActive = checkoutStep === step.id;
                const isPast = 
                  (checkoutStep === "shipping" && step.id === "information") ||
                  (checkoutStep === "payment" && (step.id === "information" || step.id === "shipping")) ||
                  (checkoutStep === "review");
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div 
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isActive || isPast 
                          ? "border-[#990000] bg-[#990000]/10 text-[#990000]" 
                          : "border-white/30 text-white/50"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                      {index < steps.length - 1 && (
                        <div 
                          className={`absolute top-1/2 -right-full w-full h-0.5 ${
                            isPast ? "bg-[#990000]" : "bg-white/20"
                          }`}
                        />
                      )}
                    </div>
                    <span 
                      className={`mt-2 text-xs ${
                        isActive || isPast ? "text-white" : "text-white/50"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Information Step */}
                  {checkoutStep === "information" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="bg-[#0a0a0a] border-[#990000]/10 text-white">
                        <CardHeader>
                          <CardTitle className="gothic-text">Contact Information</CardTitle>
                          <CardDescription className="text-white/70">
                            We'll send your order confirmation to this email.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    className="bg-black border-[#990000]/30 focus:border-[#990000]" 
                                    placeholder="your@email.com" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-[#990000]" />
                              </FormItem>
                            )}
                          />
                          
                          <div>
                            <h3 className="text-lg font-medium gothic-text mb-4">Shipping Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#990000]" />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#990000]" />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="space-y-4 mt-4">
                              <FormField
                                control={form.control}
                                name="address1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                      <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#990000]" />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="address2"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                                    <FormControl>
                                      <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#990000]" />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                  control={form.control}
                                  name="city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                      </FormControl>
                                      <FormMessage className="text-[#990000]" />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="country"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Country</FormLabel>
                                      <FormControl>
                                        <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                      </FormControl>
                                      <FormMessage className="text-[#990000]" />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="postalCode"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Postal Code</FormLabel>
                                      <FormControl>
                                        <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                      </FormControl>
                                      <FormMessage className="text-[#990000]" />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input className="bg-black border-[#990000]/30 focus:border-[#990000]" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#990000]" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setLocation("/shop")}
                            className="border-[#990000] text-[#990000] hover:bg-[#990000]/10"
                          >
                            Back to Cart
                          </Button>
                          <Button type="submit" className="bg-[#990000] hover:bg-[#990000]/80">
                            Continue to Shipping
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                  
                  {/* Shipping Step */}
                  {checkoutStep === "shipping" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="bg-[#0a0a0a] border-[#990000]/10 text-white">
                        <CardHeader>
                          <CardTitle className="gothic-text">Shipping Method</CardTitle>
                          <CardDescription className="text-white/70">
                            Choose how you want your order delivered.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="shippingMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="space-y-4"
                                  >
                                    <div className={`flex items-center justify-between p-4 rounded-md border ${field.value === "standard" ? "border-[#990000]" : "border-white/20"} hover:border-[#990000] cursor-pointer`} onClick={() => field.onChange("standard")}>
                                      <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="standard" id="standard" className="text-[#990000]" />
                                        <div>
                                          <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                                          <p className="text-sm text-white/70">3-5 business days</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        {isShippingFree ? (
                                          <span className="line-through mr-2 text-white/50">€5.99</span>
                                        ) : null}
                                        <span className={isShippingFree ? "text-[#990000] font-bold" : ""}>
                                          {isShippingFree ? "FREE" : "€5.99"}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className={`flex items-center justify-between p-4 rounded-md border ${field.value === "express" ? "border-[#990000]" : "border-white/20"} hover:border-[#990000] cursor-pointer`} onClick={() => field.onChange("express")}>
                                      <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="express" id="express" className="text-[#990000]" />
                                        <div>
                                          <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                                          <p className="text-sm text-white/70">1-2 business days</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        {isShippingFree ? (
                                          <span className="line-through mr-2 text-white/50">€12.99</span>
                                        ) : null}
                                        <span className={isShippingFree ? "text-[#990000] font-bold" : ""}>
                                          {isShippingFree ? "FREE" : "€12.99"}
                                        </span>
                                      </div>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-[#990000]" />
                              </FormItem>
                            )}
                          />
                          
                          {isShippingFree && (
                            <div className="mt-4 p-3 bg-[#990000]/10 border border-[#990000]/20 rounded-md">
                              <p className="text-sm flex items-center">
                                <Check className="h-4 w-4 mr-2 text-[#990000]" />
                                <span><strong className="text-[#990000]">Free shipping</strong> applied! All orders over €100 qualify for free shipping.</span>
                              </p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCheckoutStep("information")}
                            className="border-[#990000] text-[#990000] hover:bg-[#990000]/10"
                          >
                            Back
                          </Button>
                          <Button type="submit" className="bg-[#990000] hover:bg-[#990000]/80">
                            Continue to Payment
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                  
                  {/* Payment Step */}
                  {checkoutStep === "payment" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="bg-[#0a0a0a] border-[#990000]/10 text-white">
                        <CardHeader>
                          <CardTitle className="gothic-text">Payment Method</CardTitle>
                          <CardDescription className="text-white/70">
                            All transactions are secure and encrypted.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="space-y-4"
                                  >
                                    <div className={`flex items-center p-4 rounded-md border ${field.value === "card" ? "border-[#990000]" : "border-white/20"} hover:border-[#990000] cursor-pointer`} onClick={() => field.onChange("card")}>
                                      <RadioGroupItem value="card" id="card" className="text-[#990000]" />
                                      <Label htmlFor="card" className="ml-3 font-medium">Credit / Debit Card</Label>
                                    </div>
                                    
                                    <div className={`flex items-center p-4 rounded-md border ${field.value === "paypal" ? "border-[#990000]" : "border-white/20"} hover:border-[#990000] cursor-pointer`} onClick={() => field.onChange("paypal")}>
                                      <RadioGroupItem value="paypal" id="paypal" className="text-[#990000]" />
                                      <Label htmlFor="paypal" className="ml-3 font-medium">PayPal</Label>
                                    </div>
                                    
                                    <div className={`flex items-center p-4 rounded-md border ${field.value === "afterpay" ? "border-[#990000]" : "border-white/20"} hover:border-[#990000] cursor-pointer`} onClick={() => field.onChange("afterpay")}>
                                      <RadioGroupItem value="afterpay" id="afterpay" className="text-[#990000]" />
                                      <Label htmlFor="afterpay" className="ml-3 font-medium">AfterPay</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-[#990000]" />
                              </FormItem>
                            )}
                          />
                          
                          {/* Payment details - this would usually connect to Stripe or another payment processor */}
                          {form.watch("paymentMethod") === "card" && (
                            <div className="mt-6 space-y-4">
                              <p className="text-white font-medium text-sm">Credit Card Details (Simulated)</p>
                              
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input 
                                    id="cardNumber"
                                    placeholder="4242 4242 4242 4242" 
                                    className="bg-black border-[#990000]/30 focus:border-[#990000]"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input 
                                      id="expiry"
                                      placeholder="MM/YY" 
                                      className="bg-black border-[#990000]/30 focus:border-[#990000]"
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input 
                                      id="cvc"
                                      placeholder="123" 
                                      className="bg-black border-[#990000]/30 focus:border-[#990000]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-6">
                            <p className="text-sm text-white/70 italic">
                              By completing your purchase, you agree to our <Link href="/terms" className="text-[#990000] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#990000] hover:underline">Privacy Policy</Link>.
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCheckoutStep("shipping")}
                            className="border-[#990000] text-[#990000] hover:bg-[#990000]/10"
                          >
                            Back
                          </Button>
                          <Button type="submit" className="bg-[#990000] hover:bg-[#990000]/80">
                            Review Order
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                  
                  {/* Review Step */}
                  {checkoutStep === "review" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="bg-[#0a0a0a] border-[#990000]/10 text-white">
                        <CardHeader>
                          <CardTitle className="gothic-text">Order Review</CardTitle>
                          <CardDescription className="text-white/70">
                            Review your order details before completing your purchase.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Shipping Details */}
                          <div>
                            <h3 className="font-medium flex items-center text-white mb-2">
                              <User className="mr-2 h-4 w-4 text-[#990000]" />
                              Contact & Shipping Details
                            </h3>
                            <div className="bg-black p-4 rounded-md border border-white/10">
                              <p>{form.getValues("firstName")} {form.getValues("lastName")}</p>
                              <p>{form.getValues("email")}</p>
                              <p>{form.getValues("phone")}</p>
                              <p>{form.getValues("address1")}</p>
                              {form.getValues("address2") && <p>{form.getValues("address2")}</p>}
                              <p>{form.getValues("city")}, {form.getValues("postalCode")}</p>
                              <p>{form.getValues("country")}</p>
                            </div>
                            <Button 
                              variant="link" 
                              className="text-[#990000] p-0 h-auto mt-1"
                              onClick={() => setCheckoutStep("information")}
                            >
                              Edit
                            </Button>
                          </div>
                          
                          {/* Shipping Method */}
                          <div>
                            <h3 className="font-medium flex items-center text-white mb-2">
                              <Truck className="mr-2 h-4 w-4 text-[#990000]" />
                              Shipping Method
                            </h3>
                            <div className="bg-black p-4 rounded-md border border-white/10">
                              <p className="flex justify-between">
                                <span>{form.getValues("shippingMethod") === "standard" ? "Standard Shipping (3-5 days)" : "Express Shipping (1-2 days)"}</span>
                                <span>{isShippingFree ? "FREE" : form.getValues("shippingMethod") === "standard" ? "€5.99" : "€12.99"}</span>
                              </p>
                            </div>
                            <Button 
                              variant="link" 
                              className="text-[#990000] p-0 h-auto mt-1"
                              onClick={() => setCheckoutStep("shipping")}
                            >
                              Edit
                            </Button>
                          </div>
                          
                          {/* Payment Method */}
                          <div>
                            <h3 className="font-medium flex items-center text-white mb-2">
                              <CreditCard className="mr-2 h-4 w-4 text-[#990000]" />
                              Payment Method
                            </h3>
                            <div className="bg-black p-4 rounded-md border border-white/10">
                              <p>
                                {form.getValues("paymentMethod") === "card" 
                                  ? "Credit / Debit Card" 
                                  : form.getValues("paymentMethod") === "paypal" 
                                    ? "PayPal" 
                                    : "AfterPay"
                                }
                                {form.getValues("paymentMethod") === "card" && (
                                  <span className="ml-2 text-white/70">•••• •••• •••• 4242</span>
                                )}
                              </p>
                            </div>
                            <Button 
                              variant="link" 
                              className="text-[#990000] p-0 h-auto mt-1"
                              onClick={() => setCheckoutStep("payment")}
                            >
                              Edit
                            </Button>
                          </div>
                          
                          {/* Order Items */}
                          <div>
                            <h3 className="font-medium flex items-center text-white mb-2">
                              <Package className="mr-2 h-4 w-4 text-[#990000]" />
                              Order Items ({cartItems.length})
                            </h3>
                            <div className="bg-black rounded-md border border-white/10 divide-y divide-white/10">
                              {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center p-4">
                                  <div className="h-16 w-16 flex-shrink-0 bg-[#0f0f0f] rounded-md overflow-hidden mr-4">
                                    <img 
                                      src={item.product.images[0]} 
                                      alt={item.product.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <h4 className="font-medium text-white">{item.product.name}</h4>
                                    <p className="text-sm text-white/70">
                                      Size: {item.variant.size}, Color: {item.variant.color}
                                    </p>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-sm text-white/70">Qty: {item.quantity}</span>
                                      <span className="font-medium">
                                        €{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                          <div className="w-full space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Subtotal</span>
                              <span>€{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/70">Shipping</span>
                              <span>{isShippingFree ? "FREE" : `€${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <Separator className="bg-white/10" />
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span className="text-[#990000]">€{finalTotal.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between w-full">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setCheckoutStep("payment")}
                              className="border-[#990000] text-[#990000] hover:bg-[#990000]/10"
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              disabled={orderProcessing}
                              className="bg-[#990000] hover:bg-[#990000]/80 flex items-center"
                            >
                              {orderProcessing ? (
                                <>
                                  <span className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Zap className="mr-2 h-4 w-4" />
                                  Complete Order
                                </>
                              )}
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </form>
              </Form>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="bg-[#0a0a0a] border-[#990000]/10 text-white sticky top-4">
                <CardHeader>
                  <CardTitle className="gothic-text">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-80 overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center py-3 border-b border-white/10 last:border-0">
                        <div className="h-16 w-16 flex-shrink-0 bg-[#0f0f0f] rounded-md overflow-hidden mr-4 relative">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-0 right-0 bg-[#990000] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-xs text-white/70 mb-1">
                            Size: {item.variant.size}, Color: {item.variant.color}
                          </p>
                          <div className="flex justify-between">
                            <span className="text-sm">
                              €{(item.product.salePrice || item.product.price).toFixed(2)} x {item.quantity}
                            </span>
                            <span className="font-medium">
                              €{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Subtotal</span>
                      <span>€{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Shipping</span>
                      <span>{isShippingFree ? "FREE" : watchShippingMethod === "standard" ? "€5.99" : "€12.99"}</span>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="flex justify-between font-bold pt-2">
                      <span>Total</span>
                      <span className="text-xl text-[#990000]">€{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {cartTotal < 100 && (
                    <div className="mt-4 p-3 bg-[#990000]/10 border border-[#990000]/20 rounded-md">
                      <p className="text-sm">
                        Add <span className="font-bold text-[#990000]">€{(100 - cartTotal).toFixed(2)}</span> more to qualify for <span className="font-bold">FREE shipping</span>!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;