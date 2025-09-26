import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  required?: boolean;
  id?: string;
  name?: string;
  title?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, label, error, onChange, containerClassName, prefix, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
        {label && (
          <Label className="text-xs font-semibold text-foreground">
            {label}
          </Label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {prefix}
            </div>
          )}
          <Input
            type={type}
            className={cn("w-full", error && "border-destructive", prefix && "pl-10", className)}
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };