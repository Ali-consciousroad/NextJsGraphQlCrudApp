"use client";

// Import the LiHTMLAttributes type from React to describe the props.
import { LiHTMLAttributes } from "react";

// Define the props for the ListItem component.
interface Props extends LiHTMLAttributes<HTMLLIElement> {
  // The unique ID of the todo item.
  todoId: number;

  // The title or text of the todo item.
  title: string;

  // A function to remove the todo item.
  removeItem: (id: number) => void;
}

// Define the functional component ListItem.
export default function ListItem({ todoId, title, removeItem, ...rest }: Props) {
  // Render an <li> element representing the todo item.
  return (
    <li
      // Add CSS classes for styling.
      className="card w-96 bg-base-100 shadow-xl cursor-pointer"
      // Spread any additional props passed to this component.
      {...rest}
      // Attach an onClick event handler to call the removeItem function.
      onClick={() => removeItem(todoId)}
    >
      <div className="card-body">
        {/* Display the title or text of the todo item. */}
        <p>{title}</p>
      </div>
    </li>
  );
}
