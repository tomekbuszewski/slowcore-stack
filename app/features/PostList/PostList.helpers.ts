import { json } from "@remix-run/node";

import { getEnv } from "@env";

import type { PostPayload } from "./PostList.types";

export async function createPost(payload: PostPayload) {
  const post = await fetch(`${getEnv("VITE_API_URL")}/objects`, {
    method: "POST",
    body: JSON.stringify({ ...payload }),
  });

  const result = await post.json();
  return json({ result });
}
