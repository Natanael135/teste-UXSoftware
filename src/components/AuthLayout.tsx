import { ReactNode } from 'react';
import { Container } from '@/components/Container';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function AuthLayout({ title, children, maxWidth = 'max-w-md' }: AuthLayoutProps) {
  return (
    <Container className={`${maxWidth} py-12`}>
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">{title}</h1>
      {children}
    </Container>
  );
}