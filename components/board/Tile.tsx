import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import type { Evaluation } from "../../types";

interface TileProps {
  letter?: string;
  evaluation?: Evaluation;
  flipDelay: number;
  onFlipEnd?: () => void;
}

const Tile: FunctionComponent<TileProps> = ({
  letter,
  evaluation,
  flipDelay,
  onFlipEnd,
}) => {
  let bgColor: string;
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
    default:
      bgColor = "";
  }

  let borderColor = "bg-gray-100 dark:border-0 dark:bg-gray4/20";
  if (letter) borderColor = "border border-gray-300 dark:border-[#565758]";

  const onAnimationEnd = () => {
    if (onFlipEnd) onFlipEnd();
  };

  const [evalClass, setEvalClass] = useState("not-evaluated");
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (evaluation) {
      timeout = setTimeout(() => {
        setEvalClass("evaluated");
      }, flipDelay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [evaluation]);

  return (
    <>
      <div
        className={`tile ${evalClass} text-[32px] font-bold uppercase`}
        onTransitionEnd={onAnimationEnd}
      >
        <div className="tile-inner">
          <div
            className={`tile-front flex h-[58px] w-[58px] items-center justify-center rounded-md ${borderColor} text-black dark:text-white`}
          >
            {letter}
          </div>
          <div
            className={`tile-back flex h-[62px] w-[62px] items-center justify-center ${bgColor} text-white`}
            onAnimationEnd={onAnimationEnd}
          >
            {letter}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tile;
