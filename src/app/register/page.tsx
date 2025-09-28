"use client";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import type { RegisterFormData } from "@/types/form";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
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
import { mask } from "remask";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useRegisterForm();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (isHydrated && user) {
      router.push("/account");
    }
  }, [user, isHydrated, router]);

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    try {
      await api.post("/auth/register", data);
      showSuccess("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string } } };
      if (error.response?.status === 409) {
        showError("CPF já cadastrado");
      } else {
        showError(error.response?.data?.message || "Erro ao cadastrar");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Cadastro">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => field.onChange(mask(e.target.value, "999.999.999-99"))}
                    placeholder="000.000.000-00"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => field.onChange(mask(e.target.value, "(99) 99999-9999"))}
                    placeholder="(00) 00000-0000"
                    autoComplete="tel"
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
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Ao continuar com o acesso, você concorda com o nosso Termo de Uso e Politicas de Privacidade.
      </p>
      <div className="text-center mt-4">
        <Link href="/login" className="text-secondary hover:underline hover:text-accent transition-colors">
          Já tem conta? Entrar
        </Link>
      </div>
    </AuthLayout>
  );
}
