"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className: "bg-primary text-primary-foreground shadow-lg rounded-md",
        style: {},
        classNames: {
          success: "!text-primary !bg-primary-foreground",
          icon: "!text-accent",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
