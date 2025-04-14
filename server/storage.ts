import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  productVariants, type ProductVariant, type InsertProductVariant,
  cartItems, type CartItem, type InsertCartItem,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // ProductVariant operations
  getProductVariants(productId: number): Promise<ProductVariant[]>;
  createProductVariant(variant: InsertProductVariant): Promise<ProductVariant>;

  // CartItem operations
  getCartItems(userId: number): Promise<CartItem[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  createCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;

  // Newsletter operations
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;

  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private productVariants: Map<number, ProductVariant>;
  private cartItems: Map<number, CartItem>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private contactMessages: Map<number, ContactMessage>;

  private userIdCounter: number;
  private categoryIdCounter: number;
  private productIdCounter: number;
  private variantIdCounter: number;
  private cartItemIdCounter: number;
  private subscriptionIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.productVariants = new Map();
    this.cartItems = new Map();
    this.newsletterSubscriptions = new Map();
    this.contactMessages = new Map();

    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.productIdCounter = 1;
    this.variantIdCounter = 1;
    this.cartItemIdCounter = 1;
    this.subscriptionIdCounter = 1;
    this.messageIdCounter = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured
    );
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNewArrival
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const createdAt = new Date();
    const product: Product = { ...insertProduct, id, createdAt };
    this.products.set(id, product);
    return product;
  }

  // ProductVariant operations
  async getProductVariants(productId: number): Promise<ProductVariant[]> {
    return Array.from(this.productVariants.values()).filter(
      (variant) => variant.productId === productId
    );
  }

  async createProductVariant(insertVariant: InsertProductVariant): Promise<ProductVariant> {
    const id = this.variantIdCounter++;
    const variant: ProductVariant = { ...insertVariant, id };
    this.productVariants.set(id, variant);
    return variant;
  }

  // CartItem operations
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
  }

  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async createCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemIdCounter++;
    const createdAt = new Date();
    const item: CartItem = { ...insertItem, id, createdAt };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  // Newsletter operations
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.subscriptionIdCounter++;
    const createdAt = new Date();
    const subscription: NewsletterSubscription = { ...insertSubscription, id, createdAt };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  // Contact messages
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageIdCounter++;
    const createdAt = new Date();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }

  // Helper method to initialize sample data
  private initializeSampleData() {
    // Sample Categories
    const categories: InsertCategory[] = [
      {
        name: "Rave Tops",
        slug: "rave-tops",
        image: "https://images.unsplash.com/photo-1520890638434-a07e0bccbbc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Express yourself with our collection of rave tops designed for maximum impact under club lights."
      },
      {
        name: "Bottoms",
        slug: "bottoms",
        image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "From cyber pants to holographic shorts - find the perfect bottoms for your next rave."
      },
      {
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1556905200-bd982f883637?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Complete your look with our range of rave accessories from LED glasses to reflective masks."
      },
      {
        name: "Bodysuits",
        slug: "bodysuits",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "One-piece wonders for a standout look that will turn heads on the dance floor."
      }
    ];

    categories.forEach(category => {
      this.createCategory(category);
    });

    // Sample Products
    const products: InsertProduct[] = [
      {
        name: "Mesh Reflective Top",
        slug: "mesh-reflective-top",
        description: "This mesh top catches the light for a stunning effect under club lighting. Made with breathable material for all-night comfort.",
        price: 39.99,
        salePrice: null,
        images: [
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRllD6ssXJGFmcQlf-0_u_S5zWEmGXckUxsBGon29hrBjbQjiOEy1O1_8cSqKbhsrW6Nd6pL1Rg42f-gNYm8-wpdoqe65DCOvJyZebLVj9PxKzWNhao9u70WNaais5810VDvGLxQOLh&usqp=CAc"
        ],
        categoryId: 1, // Rave Tops
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Cyber Pants",
        slug: "cyber-pants",
        description: "Futuristic design with reflective details and comfortable stretch fabric. Perfect for techno nights.",
        price: 54.99,
        salePrice: null,
        images: [
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        ],
        categoryId: 2, // Bottoms
        isNewArrival: true,
        isFeatured: false
      },
      {
        name: "Holographic Bodysuit",
        slug: "holographic-bodysuit",
        description: "Turn heads with this holographic bodysuit that changes color as you move. Stretchy and comfortable for all-night dancing.",
        price: 65.99,
        salePrice: null,
        images: [
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        ],
        categoryId: 4, // Bodysuits
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "LED Light Glasses",
        slug: "led-light-glasses",
        description: "Light up the night with these programmable LED glasses. Multiple patterns and colors controlled via smartphone app.",
        price: 29.99,
        salePrice: null,
        images: [
          "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        ],
        categoryId: 3, // Accessories
        isNewArrival: true,
        isFeatured: false
      },
      {
        name: "Neon Crop Top",
        slug: "neon-crop-top",
        description: "Ultra-bright neon crop top that glows under UV light. Elastic material for a perfect fit.",
        price: 34.99,
        salePrice: 29.99,
        images: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        ],
        categoryId: 1, // Rave Tops
        isNewArrival: false,
        isFeatured: true
      },
      {
        name: "Holographic Shorts",
        slug: "holographic-shorts",
        description: "High-waisted holographic shorts that shift colors as you move. Includes hidden pocket for essentials.",
        price: 45.99,
        salePrice: null,
        images: [
          "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        ],
        categoryId: 2, // Bottoms
        isNewArrival: false,
        isFeatured: true
      }
    ];

    products.forEach(product => {
      this.createProduct(product);
    });

    // Sample Product Variants
    const variants: InsertProductVariant[] = [
      // Mesh Reflective Top Variants
      { productId: 1, color: "Cyan", size: "S", stockQuantity: 10 },
      { productId: 1, color: "Cyan", size: "M", stockQuantity: 15 },
      { productId: 1, color: "Cyan", size: "L", stockQuantity: 12 },
      { productId: 1, color: "Magenta", size: "S", stockQuantity: 8 },
      { productId: 1, color: "Magenta", size: "M", stockQuantity: 14 },
      { productId: 1, color: "Magenta", size: "L", stockQuantity: 11 },
      { productId: 1, color: "Yellow", size: "S", stockQuantity: 7 },
      { productId: 1, color: "Yellow", size: "M", stockQuantity: 13 },
      { productId: 1, color: "Yellow", size: "L", stockQuantity: 9 },
      
      // Cyber Pants Variants
      { productId: 2, color: "Black", size: "S", stockQuantity: 8 },
      { productId: 2, color: "Black", size: "M", stockQuantity: 10 },
      { productId: 2, color: "Black", size: "L", stockQuantity: 12 },
      { productId: 2, color: "White", size: "S", stockQuantity: 6 },
      { productId: 2, color: "White", size: "M", stockQuantity: 9 },
      { productId: 2, color: "White", size: "L", stockQuantity: 11 },
      
      // Holographic Bodysuit Variants
      { productId: 3, color: "Cyan", size: "S", stockQuantity: 5 },
      { productId: 3, color: "Cyan", size: "M", stockQuantity: 8 },
      { productId: 3, color: "Cyan", size: "L", stockQuantity: 6 },
      { productId: 3, color: "Magenta", size: "S", stockQuantity: 4 },
      { productId: 3, color: "Magenta", size: "M", stockQuantity: 7 },
      { productId: 3, color: "Magenta", size: "L", stockQuantity: 5 },
      
      // LED Light Glasses Variants
      { productId: 4, color: "Cyan", size: "One Size", stockQuantity: 20 },
      { productId: 4, color: "Magenta", size: "One Size", stockQuantity: 18 },
      { productId: 4, color: "Yellow", size: "One Size", stockQuantity: 15 },
      
      // Neon Crop Top Variants
      { productId: 5, color: "Neon Green", size: "S", stockQuantity: 7 },
      { productId: 5, color: "Neon Green", size: "M", stockQuantity: 9 },
      { productId: 5, color: "Neon Green", size: "L", stockQuantity: 6 },
      { productId: 5, color: "Neon Pink", size: "S", stockQuantity: 8 },
      { productId: 5, color: "Neon Pink", size: "M", stockQuantity: 10 },
      { productId: 5, color: "Neon Pink", size: "L", stockQuantity: 7 },
      
      // Holographic Shorts Variants
      { productId: 6, color: "Silver", size: "S", stockQuantity: 6 },
      { productId: 6, color: "Silver", size: "M", stockQuantity: 9 },
      { productId: 6, color: "Silver", size: "L", stockQuantity: 7 },
      { productId: 6, color: "Gold", size: "S", stockQuantity: 5 },
      { productId: 6, color: "Gold", size: "M", stockQuantity: 8 },
      { productId: 6, color: "Gold", size: "L", stockQuantity: 6 }
    ];

    variants.forEach(variant => {
      this.createProductVariant(variant);
    });
  }
}

export const storage = new MemStorage();
