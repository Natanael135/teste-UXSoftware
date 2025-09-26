import { showError } from '@/utils/toast';

export function handleApiError(error: unknown, defaultMessage = 'Erro na operação'): string {
  if (typeof error === 'object' && error && 'response' in error) {
    const err = error as { response?: { status?: number; data?: { message?: string } } };

    if (err.response?.status === 409) {
      return 'Conflito: Item já existe';
    }

    if (err.response?.status === 401) {
      return 'Não autorizado: Faça login novamente';
    }

    if (err.response?.status === 403) {
      return 'Acesso negado';
    }

    if (err.response?.status === 404) {
      return 'Recurso não encontrado';
    }

    if (err.response?.status === 422) {
      return 'Dados inválidos';
    }

    if (err.response?.data?.message) {
      return err.response.data.message;
    }
  }

  return defaultMessage;
}

export function handleApiErrorWithToast(error: unknown, defaultMessage = 'Erro na operação'): void {
  const message = handleApiError(error, defaultMessage);
  showError(message);
}