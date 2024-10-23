import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

export const Primary: StoryObj<typeof Input> = {
  args: {
    placeholder: "E.g. John Doe",
    name: "your-name",
  },
};

export default {
  title: "UI/Atoms/Input",
  component: Input,
} satisfies Meta<typeof Input>;
