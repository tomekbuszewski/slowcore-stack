import type { Joke } from "./Jokes.types";

import { getEnv } from "@env";

export async function loader(): Promise<Joke[]> {
  const data = await fetch(`${getEnv("VITE_API_URL")}/random/10`);

  return (await data.json()) as Promise<Joke[]>;
}
