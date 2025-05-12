import React from "react";
import clsx from "clsx";

// Button component with default props
const Button = ({
  title = "Click Me", // Default button text
  onClick, // Click handler function
  className = "", // Additional custom classes
  type = "button", // HTML button type (button, submit, reset)
  ...props // Rest of the props spread to button element
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        // Base styles
        "px-12 py-5 text-xs uppercase tracking-widest font-medium text-black bg-white",
        // Effects and transitions
        "rounded-full shadow-md transition-all duration-300 ease-in-out",
        // Hover states
        "hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:-translate-y-2",
        // Active and focus states
        "active:translate-y-1 focus:outline-none",
        className // Custom classes passed via props
      )}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
