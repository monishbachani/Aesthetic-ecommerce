import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  reviews, type Review, type InsertReview,
  carts, type Cart, type InsertCart, type CartItem,
  orders, type Order, type InsertOrder
} from "@shared/schema";
import { IStorage } from "./storage";
import { db } from "./db";
import { eq, like, and, desc, or } from "drizzle-orm";
import { json } from "drizzle-orm/pg-core";

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize sample data if needed - usually only needed once
    this.initializeSampleDataIfNeeded();
  }
  
  private async initializeSampleDataIfNeeded() {
    // Check if we already have data in the categories table
    const existingCategories = await db.select().from(categories);
    
    // If we already have data, don't initialize again
    if (existingCategories.length > 0) {
      return;
    }
    
    // Add categories
    const sampleCategories: InsertCategory[] = [
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
    
    // Insert categories and collect their IDs
    const createdCategories = [];
    for (const category of sampleCategories) {
      const [createdCategory] = await db.insert(categories).values(category).returning();
      createdCategories.push(createdCategory);
    }
    
    // Add products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Floral Chikankari Kurti",
        description: "Beautiful floral printed kurti in soft pastel colors with exquisite Chikankari work",
        price: 179900, // in paise (₹1,799)
        discountedPrice: 249900, // in paise (₹2,499)
        categoryId: createdCategories[0].id,
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
        categoryId: createdCategories[1].id,
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
        categoryId: createdCategories[0].id,
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
        categoryId: createdCategories[1].id,
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
        categoryId: createdCategories[0].id,
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
        categoryId: createdCategories[2].id,
        imageUrls: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["S", "M", "L"],
        colors: ["Black", "Red", "Gold"],
        inStock: true,
        isFeatured: false,
        isNewArrival: true
      }
    ];
    
    // Insert products and collect their IDs
    const createdProducts = [];
    for (const product of sampleProducts) {
      const [createdProduct] = await db.insert(products).values({
        ...product,
        averageRating: 0,
        reviewCount: 0
      }).returning();
      createdProducts.push(createdProduct);
    }
    
    // Add reviews
    const sampleReviews: InsertReview[] = [
      {
        productId: createdProducts[0].id,
        userId: 1, // We'll create this user if needed
        rating: 5,
        comment: "The quality of the fabric and stitching is exceptional. I've received so many compliments on this kurti!",
        userName: "Riya S.",
        userLocation: "Jaipur, India"
      },
      {
        productId: createdProducts[1].id,
        userId: 2,
        rating: 5,
        comment: "Fast delivery and the kurti fits perfectly. The colors are vibrant and the zari embroidery detail is beautiful in person.",
        userName: "Anjali M.",
        userLocation: "Delhi, India"
      },
      {
        productId: createdProducts[2].id,
        userId: 3,
        rating: 4,
        comment: "I love how unique Dazzle Fashion's designs are. The Mirror Work Cotton Kurti I purchased is both comfortable and elegant.",
        userName: "Kavita P.",
        userLocation: "Mumbai, India"
      }
    ];
    
    // Insert reviews
    for (const review of sampleReviews) {
      await db.insert(reviews).values({
        ...review,
        userImage: null // Adding missing required field
      }).returning();
    }
    
    // Update product ratings
    for (const product of createdProducts) {
      const productReviews = await db.select().from(reviews).where(eq(reviews.productId, product.id));
      if (productReviews.length > 0) {
        const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = Math.round(totalRating / productReviews.length);
        
        await db.update(products)
          .set({ 
            averageRating,
            reviewCount: productReviews.length
          })
          .where(eq(products.id, product.id));
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }
  
  async getCategoryByName(name: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories)
      .where(eq(categories.name, name));
    return category;
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.isFeatured, true));
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.isNewArrival, true));
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    return db.select().from(products).where(
      or(
        like(products.name, `%${query}%`),
        like(products.description, `%${query}%`)
      )
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products)
      .values({
        ...insertProduct,
        averageRating: 0,
        reviewCount: 0
      })
      .returning();
    return product;
  }
  
  // Review methods
  async getReviews(productId: number): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.productId, productId));
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews)
      .values({
        ...insertReview,
        userImage: null // Adding missing required field
      })
      .returning();
    
    // Update product average rating and review count
    const productReviews = await this.getReviews(insertReview.productId);
    if (productReviews.length > 0) {
      const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = Math.round(totalRating / productReviews.length);
      
      await db.update(products)
        .set({ 
          averageRating,
          reviewCount: productReviews.length
        })
        .where(eq(products.id, insertReview.productId));
    }
    
    return review;
  }
  
  // Cart methods
  async getCart(userId: number): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    return cart;
  }
  
  async createCart(insertCart: InsertCart): Promise<Cart> {
    // For values like items that need to be JSON, we need to cast
    const [cart] = await db.insert(carts)
      .values({
        ...insertCart,
        // createdAt and updatedAt will be set by defaultNow() in the schema
      })
      .returning();
    return cart;
  }
  
  async updateCart(id: number, items: CartItem[]): Promise<Cart | undefined> {
    const [updatedCart] = await db.update(carts)
      .set({
        items: items as any, // Cast to any for JSON compatibility
        updatedAt: new Date()
      })
      .where(eq(carts.id, id))
      .returning();
    return updatedCart;
  }
  
  // Order methods
  async getOrders(userId: number): Promise<Order[]> {
    return db.select().from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders)
      .values({
        ...insertOrder,
        // No need to specify createdAt as the schema has defaultNow()
      })
      .returning();
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }
}