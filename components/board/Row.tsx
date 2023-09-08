import type { FunctionComponent } from "react";
import { lastTileReveal } from "../../state/gameSlice";
import { useAppDispatch } from "../../state/hooks";
import Tile from "./Tile";
import type { Evaluation } from "../../types";

const maxLetters = 5;

interface RowProps {
  letters: string;
  evaluation?: Evaluation[];
}

const Row: FunctionComponent<RowProps> = ({ letters, evaluation }) => {
  const dispatch = useAppDispatch();
  let letterArray = Array.from(letters);
  const letterCount = letterArray.length;
  if (letterArray.length < maxLetters) {
    for (let i = 0; i < maxLetters - letterCount; i++) {
      letterArray.push("");
    }
  }

  return (
    <div className="flex space-x-[8px]">
      {letterArray.map((letter, index) => {
        let onFlipEnd: (() => void) | undefined;
        if (index === letterArray.length - 1)
          onFlipEnd = () => {
            dispatch(lastTileReveal());
          };
        return (
          <Tile
            key={index}
            letter={letter}
            flipDelay={index * 300}
            evaluation={evaluation?.at(index)}
            onFlipEnd={onFlipEnd}
          />
        );
      })}
    </div>
  );
};

export default Row;
