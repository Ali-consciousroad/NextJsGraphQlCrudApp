// Contain the query logic and each of the mutations of our API 
// Import necessary modules and types
import { InferResolvers } from "garph"; // Type inference for resolvers
import { YogaInitialContext } from "graphql-yoga"; // Yoga context for GraphQL
import { eq } from "drizzle-orm"; // Equality operator for database queries
import dayjs from "dayjs"; // Library for handling dates and times

// Import GraphQL schema and database configurations
import { mutationType, queryType } from "./schema"; // GraphQL schema definitions
import { db } from "../db/config"; // Database configuration
import { todos } from "../db/schema"; // Database schema

// Define resolvers for queries and mutations
type Resolvers = InferResolvers<
  { Query: typeof queryType; Mutation: typeof mutationType }, // Define query and mutation types
  { context: YogaInitialContext } // Define the context for Yoga
>;

export const resolvers: Resolvers = {
  Query: {
    // Resolver for the "getTodos" query
    getTodos: (_, __, ctx) => {
      // Retrieve and return all todos from the database
      return db.select().from(todos).all();
    },
  },
  Mutation: {
    // Resolver for the "addTodo" mutation
    addTodo: (_, { title }, ctx) => {
      // Insert a new todo into the database with the provided title and current timestamp
      return db
        .insert(todos)
        .values({
          title,
          createdAt: dayjs().unix(),
        })
        .returning()
        .get();
    },
    // Resolver for the "removeTodo" mutation
    removeTodo: (_, { id }, ctx) => {
      // Delete a todo from the database based on the provided ID
      return db.delete(todos).where(eq(todos.id, id)).returning().get();
    },
  },
};
