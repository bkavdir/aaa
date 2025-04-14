import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertNewsletterSubscriptionSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, Zap, Music, Headphones } from "lucide-react";

const formSchema = insertNewsletterSubscriptionSchema.extend({
  email: z.string().email({ message: "Please enter a valid email address" })
});

type FormValues = z.infer<typeof formSchema>;

const Newsletter = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Subscription successful!",
        description: "You're now on our underground list.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <section className="py-16 bg-black border-y border-[#990000]/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[20%] left-[15%] w-48 h-48 rounded-full bg-[#990000]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[25%] w-40 h-40 rounded-full bg-[#440000]/5 blur-3xl"
          animate={{ 
            scale: [1, 1.6, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border border-[#990000] mb-4">
              <Headphones className="w-8 h-8 text-[#990000]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 text-white gothic-text tracking-wider flex items-center justify-center gap-3">
            <span className="rave-glow">JOIN OUR</span> <span className="text-[#990000]">BASSLINE</span>
          </h2>
          
          <p className="text-white/70 mb-8">
            Be the first to hear about hard techno drops, underground events and exclusive promotions.
          </p>
          
          {isSubmitted ? (
            <motion.div 
              className="bg-black p-6 rounded-lg border border-[#990000] rave-glow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-2 text-white gothic-text">THANK YOU!</h3>
              <p className="text-white/70">
                You're now part of our underground community. The beat will drop soon.
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#990000]" />
                          <Input 
                            placeholder="Your email address" 
                            type="email"
                            className="pl-10 pr-4 py-3 bg-black border border-[#990000]/50 focus:border-[#990000] text-white"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#990000]" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-[#990000] hover:bg-[#990000]/80 text-white py-3 px-8 rounded-md gothic-text uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  {isPending ? "SENDING..." : "JOIN NOW"}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="text-xs text-white/50 mt-6 max-w-md mx-auto">
            By joining, you'll receive exclusive updates on new drops and underground events from Serotonin Styles. No spam, just pure techno vibes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
