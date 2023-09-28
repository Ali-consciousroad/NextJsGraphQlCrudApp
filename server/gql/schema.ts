// Importing GraphSchema from the "garph" library
import { GraphSchema } from "garph";

// Creating a new GraphQL schema instance
export const g = new GraphSchema();

// Defining the "Todo" GraphQL type with fields: id, title, and createdAt
export const TodoGQL = g.type("Todo", {
    id: g.int(), // Defining id as an integer type
    title: g.string(), // Defining title as a string type
    createdAt: g.int(), // Defining createdAt as an integer type
});

// Defining the "Query" GraphQL type with a field: getTodos
export const queryType = g.type("Query", {
    // The getTodos field returns a list of Todo types and has a description
    getTodos: g.ref(TodoGQL).list().description("Gets an array of todos"),
});

// Defining the "Mutation" GraphQL type with fields: addTodo and removeTodo
export const mutationType = g.type("Mutation", {
    // The addTodo field returns a Todo type, takes a title argument, and has a description
    addTodo: g
        .ref(TodoGQL)
        .args({
            title: g.string(), // Accepting title as a string argument
        })
        .description("Adds a new todo"),
    
    // The removeTodo field returns an optional Todo type, takes an id argument, and has a description
    removeTodo: g
        .ref(TodoGQL)
        .optional()
        .args({
            id:  g.int(), // Accepting id as an integer argument
        })
        .description("Removes an existing todo"),
});
