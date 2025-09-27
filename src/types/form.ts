import * as React from "react";

export interface FormInputProps {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  containerClassName?: string;
  prefix?: React.ReactNode;
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  accept?: string;
  disabled?: boolean;
  title?: string;
}

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  cpf: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type ProductFormData = {
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
  freeShipping?: boolean;
  color?: string;
  stock?: number;
};