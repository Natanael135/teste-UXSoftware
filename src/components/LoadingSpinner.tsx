import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-32 w-32"
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-sm z-50 ${className}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-primary`}></div>
    </div>
  );
};