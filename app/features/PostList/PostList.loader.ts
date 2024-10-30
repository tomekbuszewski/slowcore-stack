import type { Post } from "./PostList.types";

import { getEnv } from "@env";

export async function loader(): Promise<Post[]> {
  const data = await fetch(`${getEnv("VITE_API_URL")}/objects`);

  return (await data.json()) as Promise<Post[]>;
}
