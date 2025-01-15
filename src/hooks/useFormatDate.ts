import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function useFormatDate(date: Date) {
  const formattedDate = format(date, "dd 'de' MMMM 'às' HH:mm", {
    locale: ptBR,
  });

  const relativeDate = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });

  const ISODate = date.toISOString();

  return { formattedDate, relativeDate, ISODate };
}
