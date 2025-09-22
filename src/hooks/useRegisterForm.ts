import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "./useRegisterSchema";

export function useRegisterForm() {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
}
