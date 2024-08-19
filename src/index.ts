import express, { Application } from "express";
import cors from "cors";
import config from "./config";
import connectDB from "./db";
import userRouter from "./controllers/userController";
import productRouter from "./controllers/productController";
import orderRouter from "./controllers/orderController";
import { errorHandler } from "./middleware/asyncCatchHandler";
import { authHandler } from "./middleware/authHandler";
import EventEmitter from "events";
import { ApolloServer } from "apollo-server-express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

// Initialize Express application
const app: Application = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // Pass the schema here
    graphiql: true,
  })
);

// // Event emitter setup
// const eventEmitter = new EventEmitter();
// eventEmitter.on("eventName", (data, callback) => {
//   console.log("An event occurred!", data);
//   callback({ success: true, data });
// });

// // Database connection

// // Basic health check route
// app.get("/", (req, res) => {
//   eventEmitter.emit(
//     "eventName",
//     { message: "Hello, World!" },
//     (response: any) => {
//       res.json({
//         health: "OK",
//         message: "✅ Welcome to the CRUD API",
//         eventResponse: response,
//       });
//     }
//   );
// });

// // User routes
// app.use("/api/user", userRouter);

// // Authentication middleware
// app.use(authHandler);

// // Product and order routes
// app.use("/api/products", productRouter);
// app.use("/api/orders", orderRouter);

// // Global error handler
// app.use(errorHandler);

// // 404 handler for undefined routes
// app.use("*", (req, res) => {
//   return res
//     .status(404)
//     .json({ msg: "Please check the URL that you are trying to access" });
// });

// // Start Apollo Server and apply middleware to Express
// const startServer = async () => {
//   const server = new ApolloServer({ typeDefs, resolvers });

//   await server.start();
//   // server.applyMiddleware({ app });

// Start the Express server
const PORT = config.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// };

// // Start the server
// startServer().catch((error) => {
//   console.error("Failed to start the server:", error);
// });
