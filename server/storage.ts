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
    // Ensure description is null instead of undefined to match Category type
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null 
    };
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
    const product: Product = { 
      id,
      name: insertProduct.name,
      slug: insertProduct.slug,
      description: insertProduct.description,
      price: insertProduct.price,
      salePrice: insertProduct.salePrice ?? null,
      images: [...insertProduct.images], // Ensure images is properly typed as string[]
      categoryId: insertProduct.categoryId,
      isNewArrival: insertProduct.isNewArrival ?? null,
      isFeatured: insertProduct.isFeatured ?? null,
      createdAt
    };
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
        name: "Tribal Zip-Up Hoodie",
        slug: "tribal-zip-up-hoodie",
        description: "Channel your inner urban warrior with this tribal hoodie. Battle not included.",
        price: 54.99,
        salePrice: 49.99,
        images: [
          "/zipper.jpeg"
        ],
        categoryId: 1, // Rave Tops
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Graphic Print Hoodie",
        slug: "graphic-print-hoodie",
        description: "Because nothing says ‘I’m mysterious’ like a hoodie with cryptic graphics.",
        price: 54.99,
        salePrice: 49.99,
        images: [
          "/jesus.jpeg"
        ],
        categoryId: 1, // Rave Tops
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Eye Pattern Hoodie",
        slug: "eye-pattern-hoodie",
        description: "Keep all eyes on you, literally. Perfect for those who love a little paranoia with their style.",
        price: 54.99,
        salePrice: 49.99,
        images: [
          "/eyes.jpeg"
        ],
        categoryId: 1, // Rave Tops
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Denim Layered Jacket",
        slug: "denim-layered-jacket",
        description: "Perfect for when you want to look ruggedly cool, like you just walked out of a post-apocalyptic movie.",
        price: 54.99,
        salePrice: 49.99,
        images: [
          "/armour.jpeg"
        ],
        categoryId: 1, // Bottoms
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Sporty Puffer Jacket",
        slug: "sporty-puffer-jacket",
        description: "Stay warm while looking like you’re ready to join a secret rave in the Arctic.",
        price: 74.99,
        salePrice: 64.99,
        images: [
          "/adidog.jpeg"
        ],
        categoryId: 1, 
        isNewArrival: true,
        isFeatured: true
      },
      //////////////////////////////////////////////////////
      {
        name: "Chic Cutout Bodysuit",
        slug: "chic-cutout-bodysuit",
        description: "Elevate your style with this chic cutout bodysuit. A versatile piece that adds flair to any outfit.",
        price: 24.99,
        salePrice: 19.99,
        images: [
          "/bodysuit.jpeg"
        ],
        categoryId: 4, // Bodysuits
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Edgy Cutout Dress",
        slug: "edgy-cutout-dress",
        description: "Turn heads at any event with this daring cutout dress. Perfect for making a bold statement on the dance floor.",
        price: 29.99,
        salePrice: 24.99,
        images: [
          "/wow.jpeg"
        ],
        categoryId: 4, // Bodysuits
        isNewArrival: true,
        isFeatured: true
      }, 
      ///////////////////////////////////////////////////
      {
        name: "Heart and Star Chain Necklace",
        slug: "heart-and-star-chain-necklace",
        description: "Express your bold style with this heart and star chain necklace. A striking accessory that complements your rave-ready look.",
        price: 29.99,
        salePrice: 19.99,
        images: [
          "/3.jpeg"
        ],
        categoryId: 3, // Accessories
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "All-Seeing Eye Necklace",
        slug: "all-seeing-eye-necklace",
        description: "Stay stylishly protected with this all-seeing eye necklace. A unique piece that adds intrigue and charm to any rave ensemble.",
        price: 29.99,
        salePrice: 19.99,
        images: [
          "/WhatsAp.jpeg"
        ],
        categoryId: 3, // Accessories
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Opalescent Chain Necklace",
        slug: "opalescent-chain-necklace",
        description: "Add a touch of ethereal glow to your rave outfit with this opalescent chain necklace. Perfect for making a statement on the dance floor.",
        price: 29.99,
        salePrice: 19.99,
        images: [
          "/2.jpeg"
        ],
        categoryId: 3, 
        isNewArrival: true,
        isFeatured: true
      },
      {
        name: "Rave Essantial Bag",
        slug: "rave-essantial-bag",
        description: "Stay hands-free and stylish at any rave with this functional crossbody bag. Perfect for keeping your essentials secure while you dance the night away.",
        price: 29.99,
        salePrice: 24.99,
        images: [
          "/4.jpeg"
        ],
        categoryId: 3, 
        isNewArrival: true,
        isFeatured: true
      }
    ];

    products.forEach(product => {
      this.createProduct(product);
    });

    // Sample Product Variants
    const variants: InsertProductVariant[] = [
      // Mesh Reflective Top Variants
      { productId: 1, size: "S", stockQuantity: 10 },
      { productId: 1, size: "M", stockQuantity: 15 },
      { productId: 1, size: "L", stockQuantity: 12 },
      { productId: 1, size: "XL", stockQuantity: 8 },
      
      // Cyber Pants Variants
      { productId: 2, size: "S", stockQuantity: 8 },
      { productId: 2, size: "M", stockQuantity: 10 },
      { productId: 2, size: "L", stockQuantity: 12 },
      { productId: 2, size: "XL", stockQuantity: 6 },
      
      // Heart and Star Chain Necklace Variants
      { productId: 5, size: "One Size", stockQuantity: 15 },
      
      // Rave Essantial Bag Variants
      { productId: 6, size: "One Size", stockQuantity: 12 },
      
      // Holographic Bodysuit Variants
      { productId: 7, size: "S", stockQuantity: 5 },
      { productId: 7, size: "M", stockQuantity: 8 },
      { productId: 8, size: "L", stockQuantity: 6 },
      
      // LED Light Glasses Variants
      { productId: 4, size: "One Size", stockQuantity: 20 },
      
      // Neon Crop Top Variants
      { productId: 8, size: "S", stockQuantity: 7 },
      { productId: 5, size: "M", stockQuantity: 9 },
      { productId: 5, size: "L", stockQuantity: 6 },
      
      // Holographic Shorts Variants
      { productId: 6, size: "S", stockQuantity: 6 },
      { productId: 6, size: "M", stockQuantity: 9 },
      { productId: 6, size: "L", stockQuantity: 7 }
    ];

    variants.forEach(variant => {
      this.createProductVariant(variant);
    });
  }
}

export const storage = new MemStorage();
