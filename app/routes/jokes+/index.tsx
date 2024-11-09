import { Jokes } from "@features";
import {
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

export async function loader() {
  return { jokes: await Jokes.loader() };
}

export async function action(args: ActionFunctionArgs) {
  return {
    jokes: await Jokes.action(args),
  }
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Available jokes",
    },
  ];
};

export default function Index() {
  const jokesActionData = useActionData<typeof action>();
  const jokesLoaderData = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Available jokes
      </h2>

      <Jokes.component
        actionData={jokesActionData?.jokes}
        jokes={jokesLoaderData?.jokes}
      />
    </div>
  );
}
