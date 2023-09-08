import type { FunctionComponent, ReactNode } from "react";
import type { Evaluation } from "../../types";

interface KeyProps {
  children?: ReactNode;
  onClick: () => void;
  large?: boolean;
  evaluation?: Evaluation;
}

const Key: FunctionComponent<KeyProps> = ({
  children,
  onClick,
  large,
  evaluation,
}) => {
  const width = large ? "w-16" : "w-11";
  let bgColor = "bg-light-gray dark:bg-gray4";
  switch (evaluation) {
    case "absent":
      bgColor = "bg-gray1 dark:bg-gray1";
      break;
    case "present":
      bgColor = "bg-yellow1 dark:bg-yellow1";
      break;
    case "correct":
      bgColor = "bg-green1 dark:bg-green1";
      break;
  }

  let textColor = evaluation ? "text-white" : "text-black dark:text-white";

  return (
    <button
      onClick={onClick}
      className={`${width} ${bgColor} ${textColor} flex h-14 select-none items-center justify-center rounded fill-current text-[13.333px] font-bold uppercase`}
    >
      {children}
    </button>
  );
};

export default Key;
