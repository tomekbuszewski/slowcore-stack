import mockData from "@mocks/items";
import { createRemixStub } from "@remix-run/testing";
import { render } from "@testing-library/react";

import { Jokes } from "./Jokes";

const Stub = createRemixStub([
  {
    path: "/",
    Component: (props) => <Jokes {...props} jokes={mockData} />,
  },
]);

describe("Features / Jokes", () => {
  it("should render", () => {
    const { container } = render(<Stub />);
    expect(container).toBeInTheDocument();
  });

  it("should render the Jokes component", () => {
    const { container } = render(<Stub />);
    expect(container.querySelectorAll("li")).toHaveLength(mockData.length);
  });
});
