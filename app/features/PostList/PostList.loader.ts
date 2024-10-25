import { getEnv } from "@env";

import type { Post } from "./PostList.types";

export async function loader(): Promise<Post[]> {
  const data = await fetch(`${getEnv("VITE_API_URL")}/objects`);

  return await data.json();
}
