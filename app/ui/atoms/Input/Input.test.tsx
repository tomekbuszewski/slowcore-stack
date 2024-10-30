import { render, screen } from "@testing-library/react";

import Input from "./Input";

describe("UI / Atoms / Input", () => {
  it("renders properly", () => {
    render(<Input id="test-id" name="test-name" />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("id", "test-id");
    expect(inputElement).toHaveAttribute("name", "test-name");
  });

  it("uses name as id if id is not provided", () => {
    render(<Input name="test-name" />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("id", "test-name");
    expect(inputElement).toHaveAttribute("name", "test-name");
  });

  it("uses id as name if name is not provided", () => {
    render(<Input id="test-id" />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("id", "test-id");
    expect(inputElement).toHaveAttribute("name", "test-id");
  });

  it("warns if neither id nor name is provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation((str: string) => str);

    render(<Input />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Input must have an id or name attribute",
    );

    consoleWarnSpy.mockRestore();
  });

  it("sets aria-placeholder if provided", () => {
    render(
      <Input
        id="test-id"
        name="test-name"
        aria-placeholder="test-aria-placeholder"
      />,
    );
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute(
      "aria-placeholder",
      "test-aria-placeholder",
    );
  });

  it("uses placeholder as aria-placeholder if aria-placeholder is not provided", () => {
    render(
      <Input id="test-id" name="test-name" placeholder="test-placeholder" />,
    );
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute(
      "aria-placeholder",
      "test-placeholder",
    );
  });
});
