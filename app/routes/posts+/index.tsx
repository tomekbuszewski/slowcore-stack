import { PostList } from "@features";
import {
  type ActionFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

export async function loader() {
  return json({ postList: await PostList.loader() });
}

export async function action(args: ActionFunctionArgs) {
  return json({
    postList: await PostList.action(args),
  });
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Available items",
    },
  ];
};

export default function Index() {
  const postListActionData = useActionData<typeof action>();
  const postListLoaderData = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Available items
      </h2>

      <PostList.component
        actionData={postListActionData?.postList}
        posts={postListLoaderData.postList}
      />
    </div>
  );
}
