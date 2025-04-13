import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertNewsletterSubscriptionSchema, 
  insertContactMessageSchema,
  insertCartItemSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // Get all categories
  router.get("/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by slug
  router.get("/categories/:slug", async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Get all products
  router.get("/products", async (req: Request, res: Response) => {
    try {
      let products;
      const { category, featured, newArrivals } = req.query;

      if (category) {
        const categoryObj = await storage.getCategoryBySlug(category as string);
        if (!categoryObj) {
          return res.status(404).json({ message: "Category not found" });
        }
        products = await storage.getProductsByCategory(categoryObj.id);
      } else if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else if (newArrivals === "true") {
        products = await storage.getNewArrivals();
      } else {
        products = await storage.getProducts();
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by slug
  router.get("/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Get variants for this product
      const variants = await storage.getProductVariants(product.id);
      
      res.json({ ...product, variants });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get product variants by product ID
  router.get("/products/:id/variants", async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const variants = await storage.getProductVariants(productId);
      res.json(variants);
    } catch (error) {
      console.error("Error fetching product variants:", error);
      res.status(500).json({ message: "Failed to fetch product variants" });
    }
  });

  // Cart operations
  // For demo purposes, we'll use a fixed user ID of 1
  const DEMO_USER_ID = 1;

  // Get cart items
  router.get("/cart", async (req: Request, res: Response) => {
    try {
      const cartItems = await storage.getCartItems(DEMO_USER_ID);

      // Enhance with product details
      const enhancedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getUser(item.productId);
          const variant = await storage.getProductVariants(item.productId)
            .then(variants => variants.find(v => v.id === item.variantId));
          
          return {
            ...item,
            product,
            variant
          };
        })
      );

      res.json(enhancedCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  // Add item to cart
  router.post("/cart", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });

      const cartItem = await storage.createCartItem(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error adding item to cart:", error);
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  // Update cart item
  router.patch("/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }

      const quantitySchema = z.object({
        quantity: z.number().int().positive()
      });

      const { quantity } = quantitySchema.parse(req.body);
      
      const updatedItem = await storage.updateCartItem(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  router.delete("/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }

      const deleted = await storage.deleteCartItem(id);
      if (!deleted) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  // Newsletter subscription
  router.post("/newsletter", async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json({ success: true, subscription });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating newsletter subscription:", error);
      res.status(500).json({ message: "Failed to create newsletter subscription" });
    }
  });

  // Contact form submissions
  router.post("/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Register routes
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
