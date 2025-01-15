import React from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList } from "./styles";
import HistoryTableRow from "./components/HistoryTableRow";

export default function HistoryPage() {
  const { cycles } = React.useContext(CyclesContext);

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
              <HistoryTableRow
                key={cycle.id}
                cycle={cycle}
              />
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
