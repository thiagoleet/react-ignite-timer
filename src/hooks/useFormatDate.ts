import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function useFormatDate(date?: Date | null) {
  function formattedDate(inputDate: Date) {
    {
      return format(new Date(inputDate || date), "dd 'de' MMMM 'às' HH:mm", {
        locale: ptBR,
      });
    }
  }

  function relativeDate(inputDate?: Date) {
    return formatDistanceToNow(new Date(inputDate ?? date!), {
      locale: ptBR,
      addSuffix: true,
    });
  }

  function ISODate(inputDate?: Date) {
    return inputDate ? new Date(inputDate).toISOString() : date!.toISOString();
  }

  return { formattedDate, relativeDate, ISODate };
}
