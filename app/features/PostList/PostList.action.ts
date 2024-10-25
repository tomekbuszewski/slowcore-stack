import type { ActionFunctionArgs } from "@remix-run/node";

import { createPost } from "./PostList.helpers";
import type { FormActionResponse, PostPayload } from "./PostList.types";

export async function action({
  request,
}: ActionFunctionArgs): Promise<FormActionResponse> {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const errors: Partial<PostPayload> = {};

  if (!formData.get("name")) {
    errors.name = "Title is required";
  }

  if (Object.keys(errors).length) {
    return { errors, status: 400, message: "Error" };
  }

  await createPost({
    name,
  });

  return {
    message: "Post created",
    errors,
    status: 201,
    post: { id: Math.random(), name },
  };
}
