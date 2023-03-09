import { render, screen } from "@testing-library/react";
import IoDrawer from "./IoDrawer";

test("is closed by default", async () => {
  render(
    IoDrawer({
      isOpen: false,
      onClose: () => {
        return;
      },
      children: <h1>Hello Drawer!</h1>,
    })
  );

  const drawer = screen.queryByRole("dialog");
  expect(drawer).toBeNull();
});

test("is opened by default", async () => {
  render(
    IoDrawer({
      isOpen: true,
      onClose: () => {
        return;
      },
      children: <h1>Hello Drawer!</h1>,
    })
  );

  const drawer = screen.queryByRole("dialog");
  expect(drawer).toBeInTheDocument();

  const content = screen.getByText("Hello Drawer!");
  expect(content).toBeInTheDocument();
  expect(content.tagName.toLowerCase()).toBe("h1");
});
