import { render, screen } from "@testing-library/react";
import IoButton from "./IoButton";

test("renders label by prop", () => {
  const label = "Hello Button!";
  render(IoButton({ label }));
  const button = screen.getByRole("button");

  expect(button).toHaveTextContent(label);
});

test("renders label by children", () => {
  const label = "Hello Button!";
  render(<IoButton>{label}</IoButton>);
  const button = screen.getByRole("button");

  expect(button).toHaveTextContent(label);
});
