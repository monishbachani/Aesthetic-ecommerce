import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  reviews, type Review, type InsertReview,
  carts, type Cart, type InsertCart, type CartItem,
  orders, type Order, type InsertOrder
} from "@shared/schema";
import { DatabaseStorage } from "./database-storage";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Review methods
  getReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Cart methods
  getCart(userId: number): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  updateCart(id: number, items: CartItem[]): Promise<Cart | undefined>;
  
  // Order methods
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private carts: Map<number, Cart>;
  private orders: Map<number, Order>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentReviewId: number;
  private currentCartId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.carts = new Map();
    this.orders = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentReviewId = 1;
    this.currentCartId = 1;
    this.currentOrderId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Add categories
    const categories: InsertCategory[] = [
      {
        name: "Casual Kurtis",
        description: "Perfect for everyday elegance",
        imageUrl: "https://images.unsplash.com/photo-1583391733981-8498287ebe32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
      },
      {
        name: "Festive Kurtis",
        description: "Celebrations call for something special",
        imageUrl: "https://images.unsplash.com/photo-1631233859219-52250f6c6b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
      },
      {
        name: "Designer Fusion",
        description: "Where tradition meets modernity",
        imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
      }
    ];
    
    categories.forEach(category => this.createCategory(category));
    
    // Add products
    const products: InsertProduct[] = [
      {
        name: "Floral Chikankari Kurti",
        description: "Beautiful floral printed kurti in soft pastel colors with exquisite Chikankari work",
        price: 179900, // in paise (₹1,799)
        discountedPrice: 249900, // in paise (₹2,499)
        categoryId: 1,
        imageUrls: ["https://images.unsplash.com/photo-1540246948439-35011a6ff5c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pastel Blue", "Pink", "White"],
        inStock: true,
        isFeatured: true,
        isNewArrival: true
      },
      {
        name: "Zari Embroidered Kurti",
        description: "Elegant beige kurti with intricate golden Zari embroidery for a royal look",
        price: 229900, // in paise (₹2,299)
        discountedPrice: 299900, // in paise (₹2,999)
        categoryId: 2,
        imageUrls: ["https://images.unsplash.com/photo-1602910344008-22f323cc1817?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "Gold", "Maroon"],
        inStock: true,
        isFeatured: true,
        isNewArrival: false
      },
      {
        name: "Mirror Work Cotton Kurti",
        description: "Vibrant blue kurti with geometric patterns and traditional mirror work",
        price: 159900, // in paise (₹1,599)
        discountedPrice: 199900, // in paise (₹1,999)
        categoryId: 1,
        imageUrls: ["https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["S", "M", "L"],
        colors: ["Teal Blue", "Green", "Yellow"],
        inStock: true,
        isFeatured: true,
        isNewArrival: false
      },
      {
        name: "Royal Silk Kurti",
        description: "Rich maroon silk kurti with gold embellishments and traditional design",
        price: 349900, // in paise (₹3,499)
        discountedPrice: 499900, // in paise (₹4,999)
        categoryId: 2,
        imageUrls: ["https://images.unsplash.com/photo-1631233859219-52250f6c6b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["M", "L", "XL"],
        colors: ["Maroon", "Navy Blue", "Dark Green"],
        inStock: true,
        isFeatured: true,
        isNewArrival: false
      },
      {
        name: "Casual Cotton Kurti",
        description: "Comfortable cotton kurti for everyday wear with simple yet elegant design",
        price: 129900, // in paise (₹1,299)
        discountedPrice: 159900, // in paise (₹1,599)
        categoryId: 1,
        imageUrls: ["https://images.unsplash.com/photo-1583391733981-8498287ebe32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blue", "Green", "Yellow", "Pink"],
        inStock: true,
        isFeatured: false,
        isNewArrival: true
      },
      {
        name: "Designer Party Wear Kurti",
        description: "Stylish designer kurti perfect for parties and special occasions",
        price: 279900, // in paise (₹2,799)
        discountedPrice: 349900, // in paise (₹3,499)
        categoryId: 3,
        imageUrls: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["S", "M", "L"],
        colors: ["Black", "Red", "Gold"],
        inStock: true,
        isFeatured: false,
        isNewArrival: true
      }
    ];
    
    products.forEach(product => this.createProduct(product));
    
    // Add reviews
    const reviews: InsertReview[] = [
      {
        productId: 1,
        userId: 1,
        rating: 5,
        comment: "The quality of the fabric and stitching is exceptional. I've received so many compliments on this kurti!",
        userName: "Riya S.",
        userLocation: "Jaipur, India"
      },
      {
        productId: 2,
        userId: 2,
        rating: 5,
        comment: "Fast delivery and the kurti fits perfectly. The colors are vibrant and the zari embroidery detail is beautiful in person.",
        userName: "Anjali M.",
        userLocation: "Delhi, India"
      },
      {
        productId: 3,
        userId: 3,
        rating: 4,
        comment: "I love how unique Dazzle Fashion's designs are. The Mirror Work Cotton Kurti I purchased is both comfortable and elegant.",
        userName: "Kavita P.",
        userLocation: "Mumbai, India"
      }
    ];
    
    reviews.forEach(review => this.createReview(review));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryByName(name: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.name.toLowerCase() === name.toLowerCase(),
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNewArrival,
    );
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      averageRating: 0,
      reviewCount: 0
    };
    this.products.set(id, product);
    return product;
  }
  
  // Review methods
  async getReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId,
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { ...insertReview, id };
    this.reviews.set(id, review);
    
    // Update product average rating and review count
    const product = await this.getProduct(insertReview.productId);
    if (product) {
      const productReviews = await this.getReviews(product.id);
      const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = Math.round(totalRating / productReviews.length);
      
      const updatedProduct = { 
        ...product, 
        averageRating,
        reviewCount: productReviews.length
      };
      this.products.set(product.id, updatedProduct);
    }
    
    return review;
  }
  
  // Cart methods
  async getCart(userId: number): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(
      (cart) => cart.userId === userId,
    );
  }
  
  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.currentCartId++;
    const now = new Date();
    const cart: Cart = { 
      ...insertCart, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.carts.set(id, cart);
    return cart;
  }
  
  async updateCart(id: number, items: CartItem[]): Promise<Cart | undefined> {
    const cart = this.carts.get(id);
    if (!cart) return undefined;
    
    const updatedCart = { 
      ...cart, 
      items, 
      updatedAt: new Date() 
    };
    this.carts.set(id, updatedCart);
    return updatedCart;
  }
  
  // Order methods
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
}

// Using DatabaseStorage implementation instead of MemStorage
export const storage = new DatabaseStorage();
