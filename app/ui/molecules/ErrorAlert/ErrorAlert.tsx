interface Props {
  title: string;
  message?: string;
}

function ErrorAlert(props: Props) {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="px-6 py-4 bg-red-200 text-red-800 rounded-md">
        <h1 className="block font-bold">{props.title}</h1>
        {props.message ? (
          <p dangerouslySetInnerHTML={{ __html: props.message }} />
        ) : null}
      </div>
    </div>
  );
}

export default ErrorAlert;
