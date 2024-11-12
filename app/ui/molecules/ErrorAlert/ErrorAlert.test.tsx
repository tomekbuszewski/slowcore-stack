import { render, screen } from "@testing-library/react";

import ErrorAlert from "./ErrorAlert";

describe("UI / Molecules / ErrorAlert", () => {
  it("renders properly", () => {
    render(<ErrorAlert title="test-name" />);
    const errorAlertElement = screen.getByText("test-name");

    expect(errorAlertElement).toBeInTheDocument();
  });
});
