import type { Meta, StoryObj } from "@storybook/react";

import ErrorAlert from "./ErrorAlert";

export const Primary: StoryObj<typeof ErrorAlert> = {
  args: {
    title: "Hello from Storybook",
  },
};

export const WithMessage: StoryObj<typeof ErrorAlert> = {
  args: {
    title: "Hello from Storybook",
    message: "This is a message",
  },
};

export default {
  title: "UI/Molecules/ErrorAlert",
  component: ErrorAlert,
} satisfies Meta<typeof ErrorAlert>;
