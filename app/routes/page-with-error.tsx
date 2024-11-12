import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { ErrorAlert } from "@ui/molecules";

export function loader() {
  if (Math.random() > 0.5) {
    throw new Error(
      "Random error! I am here when <code>Math.random()</code> is greater than 0.5`",
    );
  }

  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorAlert title={error.statusText} />;
  } else if (error instanceof Error) {
    return <ErrorAlert title={error.name} message={error.message} />;
  } else {
    return <ErrorAlert title="Unknown error" />;
  }
}

export default function WithError() {
  return <div>Hello, I am here when there&#39;s no error thrown.</div>;
}
