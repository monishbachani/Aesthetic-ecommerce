import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertProductSchema, 
  insertReviewSchema, 
  insertCartSchema, 
  insertOrderSchema,
  type CartItem
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handler middleware
  const handleError = (err: Error, res: Response) => {
    console.error(err);
    if (err instanceof ZodError) {
      return res.status(400).json({ 
        message: fromZodError(err).message 
      });
    }
    res.status(500).json({ message: err.message || "Internal server error" });
  };

  // User routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Create new user
      const user = await storage.createUser(userData);
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  // Category routes
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.get("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.id);
      
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const category = await storage.getCategory(categoryId);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  // Product routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category, featured, newArrivals, search } = req.query;
      
      let products;
      
      if (category && !isNaN(parseInt(category as string))) {
        const categoryId = parseInt(category as string);
        products = await storage.getProductsByCategory(categoryId);
      } else if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else if (newArrivals === "true") {
        products = await storage.getNewArrivals();
      } else if (search && typeof search === "string") {
        products = await storage.searchProducts(search);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (err) {
      handleError(err as Error, res);
    }
  });

  // Review routes
  app.get("/api/products/:id/reviews", async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const reviews = await storage.getReviews(productId);
      res.json(reviews);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  // Cart routes
  app.get("/api/cart/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      let cart = await storage.getCart(userId);
      
      // If cart doesn't exist, create a new one
      if (!cart) {
        cart = await storage.createCart({ userId, items: [] });
      }

      // Populate product details for each cart item
      const cartItems = cart.items as CartItem[];
      for (let i = 0; i < cartItems.length; i++) {
        const product = await storage.getProduct(cartItems[i].productId);
        cartItems[i].productDetails = product;
      }
      
      res.json(cart);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const cartData = insertCartSchema.parse(req.body);
      
      // Check if cart already exists for user
      const existingCart = await storage.getCart(cartData.userId!);
      
      if (existingCart) {
        const updatedCart = await storage.updateCart(existingCart.id, cartData.items as CartItem[]);
        return res.json(updatedCart);
      }
      
      const cart = await storage.createCart(cartData);
      res.status(201).json(cart);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.put("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const cartId = parseInt(req.params.id);
      
      if (isNaN(cartId)) {
        return res.status(400).json({ message: "Invalid cart ID" });
      }
      
      const cart = await storage.updateCart(cartId, req.body.items);
      
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      
      res.json(cart);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  // Order routes
  app.get("/api/orders/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (err) {
      handleError(err as Error, res);
    }
  });
  
  app.put("/api/orders/:id/status", async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(orderId, status);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (err) {
      handleError(err as Error, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
