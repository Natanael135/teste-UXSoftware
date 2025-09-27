"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useLoginForm();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  // Redirecionar usuários logados
  useEffect(() => {
    if (isHydrated && user) {
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [user, isHydrated, router]);

  const login = useAuthStore((s) => s.login);
  async function onSubmit(data: Record<string, unknown>) {
    setLoading(true);
    try {
  const res = await api.post<{ user: import("@/types/user").User; accessToken: string }>("/auth/login", data);
      login(res.user, res.accessToken);
      showSuccess("Login realizado com sucesso!");
      // Se for admin, redireciona para dashboard admin
      if (res.user && res.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data) {
        showError((err.response.data as { message?: string }).message || "Erro ao fazer login");
      } else {
        showError("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Entrar">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
      <div className="text-center mt-4">
        <Link href="/register" className="text-secondary hover:underline hover:text-accent transition-colors">
          Não tem conta? Cadastre-se
        </Link>
      </div>
    </AuthLayout>
  );
}
