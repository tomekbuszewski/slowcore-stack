interface Props {
  setup: string;
  punchline: string;
  id: string | number;
}

export default function Post(props: Props) {
  return (
    <li id={String(props.id)} key={props.id}>
      <b>{props.setup}</b>
      <br />
      {props.punchline}
    </li>
  );
}
