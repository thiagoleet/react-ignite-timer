import { Button } from "./components/Button";

export function App() {
  return (
    <>
      <p>
        <Button variant="primary" />
      </p>
      <p>
        <Button variant="secondary" />
      </p>
      <p>
        <Button variant="success" />
      </p>
      <p>
        <Button variant="danger" />
      </p>
      <p>
        <Button />
      </p>
    </>
  );
}
