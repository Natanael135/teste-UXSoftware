"use client";
"use client";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import type { RegisterFormData } from "@/hooks/useRegisterSchema";
import { api } from "@/services/api";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container } from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mask } from "remask";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

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
    <Container className="max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-foreground">CPF</label>
          <Input
            type="text"
            {...register("cpf", {
              onChange: (e) => {
                e.target.value = mask(e.target.value, ["999.999.999-99"]);
              },
            })}
            placeholder="000.000.000-00"
            autoComplete="off"
            aria-invalid={!!errors.cpf}
          />
          {errors.cpf && (
            <span className="text-accent text-sm">{errors.cpf.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 text-foreground">Nome Completo</label>
          <Input
            type="text"
            {...register("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="text-accent text-sm">{errors.name.message}</span>
          )}
        </div>
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
          <label className="block mb-1 text-foreground">Telefone</label>
          <Input
            type="text"
            {...register("phone", {
              onChange: (e) => {
                e.target.value = mask(e.target.value, ["(99) 99999-9999"]);
              },
            })}
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <span className="text-accent text-sm">{errors.phone.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 text-foreground">Senha</label>
          <Input
            type="password"
            {...register("password")}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <span className="text-accent text-sm">{errors.password.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 text-foreground">Confirmar Senha</label>
          <Input
            type="password"
            {...register("confirmPassword")}
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <span className="text-accent text-sm">{errors.confirmPassword.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-secondary hover:underline hover:text-accent transition-colors">
          Já tem conta? Entrar
        </Link>
      </div>
    </Container>
  );
}
