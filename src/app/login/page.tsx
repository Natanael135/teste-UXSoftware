"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { Container } from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const login = useAuthStore((s) => s.login);
  async function onSubmit(data: Record<string, unknown>) {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
  login(res.data.user as import("@/store/auth").User, res.data.token as string);
      showSuccess("Login realizado com sucesso!");
      router.push("/");
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
    <Container className="max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Entrar</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-foreground">E-mail</label>
          <Input
            type="email"
            {...register("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-accent text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 text-foreground">Senha</label>
          <Input
            type="password"
            {...register("password")}
            autoComplete="current-password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <span className="text-accent text-sm">{errors.password.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <div className="text-center mt-4">
        <Link href="/register" className="text-secondary hover:underline hover:text-accent transition-colors">
          Não tem conta? Cadastre-se
        </Link>
      </div>
    </Container>
  );
}
