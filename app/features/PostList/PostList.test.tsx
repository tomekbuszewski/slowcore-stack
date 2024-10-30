import mockData from "@mocks/items";
import { createRemixStub } from "@remix-run/testing";
import { render } from "@testing-library/react";

import { PostList } from "./PostList";

const Stub = createRemixStub([
  {
    path: "/",
    Component: (props) => <PostList {...props} posts={mockData} />,
  },
]);

describe("Features / PostList", () => {
  it("should render", () => {
    const { container } = render(<Stub />);
    expect(container).toBeInTheDocument();
  });

  it("should render the PostList component", () => {
    const { container } = render(<Stub />);
    expect(container.querySelectorAll("li")).toHaveLength(mockData.length);
  });
});
