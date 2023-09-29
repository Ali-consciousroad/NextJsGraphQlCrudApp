// Indicate that this file should run on the server side.
"use server";

// Import the 'revalidatePath' function from 'next/cache' for cache revalidation.
import { revalidatePath } from "next/cache";

// Import the 'GraphQLClient' and 'gql' from 'graphql-request' for making GraphQL requests.
import { GraphQLClient, gql } from "graphql-request";

// Define a GraphQL mutation query to remove a todo item by its 'id'.
const mutation = gql`
  mutation removeTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

// Export an asynchronous function 'removeTodo' that removes a todo item by its 'id'.
export async function removeTodo(id: number) {
  // Create a new GraphQL client instance pointing to the GraphQL API endpoint.
  const graphQLClient = new GraphQLClient("http://localhost:3000/api/graphql");

  // Send a GraphQL request to execute the 'mutation' query with the specified 'id'.
  await graphQLClient.request(mutation, { id });

  // Revalidate the cache for the specified path (in this case, the root path "/").
  revalidatePath("/");
}
