import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "../i18n";
import IoLink from "./IoLink";

test("renders label", async () => {
  render(
    <BrowserRouter>
      <IoLink label="Hello Link!" to="/register" />
    </BrowserRouter>
  );

  const link = screen.queryByText("Hello Link!");
  expect(link).toBeInTheDocument();
});
