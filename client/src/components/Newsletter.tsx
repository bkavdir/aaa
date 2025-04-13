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
        description: "You're now on our newsletter list.",
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
    <section className="py-16 bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold uppercase mb-4 text-[hsl(184,100%,50%)]">
            Join Our Community
          </h2>
          <p className="text-muted-foreground mb-8">
            Sign up to receive updates on new arrivals, special offers and our promotions.
          </p>
          
          {isSubmitted ? (
            <div className="bg-[#232323] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-[hsl(60,100%,50%)]">Thank You!</h3>
              <p className="text-muted-foreground">
                You've been added to our mailing list and will hear from us soon.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          placeholder="Your email address" 
                          type="email"
                          className="px-4 py-3 bg-[#232323] border border-border focus:border-[hsl(184,100%,50%)]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-[hsl(184,100%,50%)] text-black hover:bg-[hsl(184,100%,45%)] hover:shadow-[0_0_10px_rgba(0,245,255,0.7)] py-3 px-8 rounded-md uppercase tracking-wider transition-all"
                >
                  {isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            By signing up, you agree to receive marketing emails from Serotonin Styles. You can unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
