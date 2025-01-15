import React from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { useFormatDate } from "../../hooks/useFormatDate";

export default function HistoryPage() {
  const { cycles } = React.useContext(CyclesContext);
  const { formattedDate, ISODate, relativeDate } = useFormatDate();

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  <time
                    title={formattedDate(cycle.startDate)}
                    dateTime={ISODate(cycle.startDate)}
                  >
                    Há {relativeDate(cycle.startDate)}
                  </time>
                </td>
                <td>
                  {cycle.finishedAt && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {cycle.interuptedAt && !cycle.finishedAt && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.interuptedAt && !cycle.finishedAt && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
