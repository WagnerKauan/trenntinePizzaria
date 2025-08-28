"use client";


import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput(props: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);
  

  return (
    <div className="relative">
      <Input 
        type={showPassword ? "text" : "password"}
        {...props}
      />

      <Button
        type="button"
        variant="link"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  )
}