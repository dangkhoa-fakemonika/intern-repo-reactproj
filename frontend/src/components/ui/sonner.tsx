import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import React from "react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--palette)",
          "--normal-text": "#ffffff",
          "--normal-border": "#ffffff",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
