import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullscreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  fullscreen = true
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-32 w-32"
  };

  const baseClasses = fullscreen
    ? "fixed top-0 left-0 w-full h-full bg-background/80 backdrop-blur-sm z-[9999] flex justify-center items-center"
    : `flex justify-center items-center ${className}`;

  return (
    <div className={baseClasses}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-primary`}></div>
    </div>
  );
};