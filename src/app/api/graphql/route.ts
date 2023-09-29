// Import the 'createYoga' function from the 'graphql-yoga' library.
import { createYoga } from "graphql-yoga";

// Import the 'schema' from a server-side location (could be a GraphQL schema file).
import { schema } from "../../../../server/gql";

// Create a Yoga server instance with the specified 'schema', GraphQL endpoint, and fetchAPI options.
const { handleRequest } = createYoga({
  schema, // Your GraphQL schema.
  graphqlEndpoint: '/api/graphql', // The endpoint where GraphQL requests will be handled.
  fetchAPI: { Request, Response } // Options for fetching GraphQL requests (e.g., using the 'fetch' API).
});

// Export the 'handleRequest' function as 'GET' and 'POST'.
export { handleRequest as GET, handleRequest as POST };
