import type { PostPayload } from "./PostList.types";

import { getEnv } from "@env";
import { json } from "@remix-run/node";

export async function createPost(payload: PostPayload) {
  const post = await fetch(`${getEnv("VITE_API_URL")}/objects`, {
    method: "POST",
    body: JSON.stringify({ ...payload }),
  });

  const result = (await post.json()) as Promise<PostPayload>;
  return json({ result });
}
