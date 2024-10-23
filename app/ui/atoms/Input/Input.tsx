import type { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement>;

const Input = (props: Props) => {
  const id = props.id ?? props.name;
  const name = props.name ?? id;
  const ariaPlaceholder = props["aria-placeholder"]
    ? props["aria-placeholder"]
    : props.placeholder;

  if (!id || !name) {
    console.warn("Input must have an id or name attribute");
  }

  return (
    <input aria-placeholder={ariaPlaceholder} name={name} id={id} {...props} />
  );
};

export default Input;
