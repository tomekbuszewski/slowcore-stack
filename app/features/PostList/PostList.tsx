import type { Post, Props } from "./PostList.types";

import { Fragment, useEffect, useRef } from "react";
import { Form, useNavigation } from "@remix-run/react";
import { Input } from "@ui/atoms";

export function PostList({ actionData, posts = [] }: Props) {
  const transition = useNavigation();

  const formRef = useRef<HTMLFormElement>(null);
  const initialPostLength = useRef(posts.length);

  const hasErrors =
    actionData?.errors && Object.keys(actionData?.errors).length > 0;
  const hasPosts = posts.length > 0;
  const isSubmitting = transition.state === "submitting";

  useEffect(() => {
    if (initialPostLength.current !== posts.length) {
      initialPostLength.current = posts.length;
      formRef?.current?.reset();
    }
  }, [posts]);

  return (
    <div>
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        This uses a free API that is not writable. You can still create a post,
        but it will be a representation of the action.
      </div>
      {hasPosts ? (
        <Fragment>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {posts.map((post: Post) => (
              <li id={String(post.id)} key={post.id}>
                {post.name}
              </li>
            ))}

            {actionData?.post ? <li>{actionData?.post.name}</li> : null}
          </ul>

          <hr className="my-10" />
        </Fragment>
      ) : null}

      <fieldset>
        <legend className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Create
          </span>{" "}
          item
        </legend>

        <Form
          method="post"
          ref={formRef}
          style={{
            opacity: isSubmitting ? 0.2 : 1,
            pointerEvents: isSubmitting ? "none" : "auto",
            cursor: isSubmitting ? "not-allowed" : "auto",
          }}
        >
          {hasErrors && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              Please fix the form before submission!
            </div>
          )}

          <div className="my-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Device name
            </label>
            <Input
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {actionData?.errors?.name ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Please fill that field.
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </Form>
      </fieldset>
    </div>
  );
}
