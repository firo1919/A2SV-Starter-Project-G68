import * as React from "react"
import { cn } from "./utils" // Import cn from the local utils file

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "purple";
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

    const variantClasses = {
      default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      purple: "bg-purple-600 text-white hover:bg-purple-700",
    };

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomButton.displayName = "CustomButton";
