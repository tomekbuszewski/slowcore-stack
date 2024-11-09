import type { ActionFunctionArgs } from "@remix-run/node";
import type { FormActionResponse, JokePayload } from "./Jokes.types";

import { createJoke } from "./Jokes.helpers";

export async function action({
  request,
}: ActionFunctionArgs): Promise<FormActionResponse> {
  const formData = await request.formData();

  const setup = formData.get("setup") as string;
  const punchline = formData.get("punchline") as string;
  const errors: Partial<JokePayload> = {};

  if (!formData.get("setup")) {
    errors.setup = "Setup is required";
  }

  if (!formData.get("punchline")) {
    errors.punchline = "Punchline is required";
  }

  if (Object.keys(errors).length) {
    return { errors, status: 400, message: "Error" };
  }

  createJoke({
    setup,
    punchline,
  });

  return {
    message: "Joke created",
    errors,
    status: 201,
    joke: { id: Math.random(), setup, punchline },
  };
}
