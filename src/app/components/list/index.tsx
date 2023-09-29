import { infer } from "garph";
import { request, gql } from "graphql-request";

// Import the 'TodoGQL' type from your GraphQL schema file.
import { TodoGQL } from "../../../../server/gql/schema";

// Import the 'ListItem' component and 'removeTodo' function from local files.
import ListItem from "../ListItem";
import { removeTodo } from "./actions";

// Define a GraphQL query to fetch todos with their 'id' and 'title'.
const query = gql`
    query getTodos {
        getTodos {
            id
            title
        }
    }
`;

// Define the shape of the data returned by the GraphQL query.
interface QueryData {
    getTodos: Array<Infer<typeof TodoGQL>>;
}

// Export a default async function 'list' (your component).
export default async function list() {
    // Send a GraphQL request to fetch todos from the API.
    const { getTodos } = await request<QueryData>({
        url: "http://localhost:3000/api/graphql", // GraphQL API endpoint URL
        query, // The defined GraphQL query
    });
    
    return (
        <ul className="space-y-4">
            {getTodos?.map((todo) => {
                return (
                    // Render a 'ListItem' for each todo with necessary props.
                    <ListItem
                        key={todo.id}
                        title={todo.title}
                        todoId={todo.id}
                        removeItem={removeTodo} // The 'removeTodo' function
                    />
                );
            })}
        </ul>
    );
}
