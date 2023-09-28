// Import the createYoga function from graphql-yoga
import { createYoga } from "graphql-yoga";

// Import the GraphQL schema from the server/gql directory
import { schema } from "../../../../server/gql";

// Create a new instance of YogaServer using createYoga
const { handleRequest } = createYoga({
    // Provide the GraphQL schema to the YogaServer
    schema,

    // Define the GraphQL endpoint where requests will be handled
    graphqlEndpoint: '/api/graphql',

    // Specify the fetch API used by YogaServer (Request and Response)
    fetchAPI: { Request, Response }
});

// Export the handleRequest function as both GET and POST
export { handleRequest as GET, handleRequest as POST }
