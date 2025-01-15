import { useFormatDate } from "../../../hooks/useFormatDate";
import { Cycle } from "../../../models/Cycle";
import { Status } from "../styles";

interface HistoryTableRowProps {
  cycle: Cycle;
}

export default function HistoryTableRow({ cycle }: HistoryTableRowProps) {
  const { formattedDate, ISODate, relativeDate } = useFormatDate(
    cycle.startDate
  );

  function getStatus(): { text: string; color: "yellow" | "red" | "green" } {
    if (cycle.finishedAt) {
      return { text: "Concluído", color: "green" };
    } else if (cycle.interuptedAt) {
      return { text: "Interrompido", color: "yellow" };
    } else {
      return { text: "Pendente", color: "red" };
    }
  }

  const { text, color } = getStatus();
  return (
    <tr>
      <td>{cycle.task}</td>
      <td>{cycle.minutesAmount} minutos</td>
      <td>
        <time
          title={formattedDate}
          dateTime={ISODate}
        >
          Há {relativeDate}
        </time>
      </td>
      <td>
        <Status statusColor={color}>{text}</Status>
      </td>
    </tr>
  );
}
