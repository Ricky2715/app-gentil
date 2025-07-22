// Função utilitária para formatar datas
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
