import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full ${className}`}>
    {children}
  </div>
);
